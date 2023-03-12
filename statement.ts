import type { Invoice } from "./types/invoice.ts";
import type { Plays } from "./types/plays.ts";
import type { StatementData } from "./types/statement.ts";
import { createStatementData } from "./createStatementData.ts";

export const statement = (invoice: Invoice, plays: Plays): string => {
  return renderPlainText(createStatementData(invoice, plays));
};

const renderPlainText = (data: StatementData): string => {
  let result = `Statement for ${data.customer}\n`;
  for (const performance of data.performances) {
    result += `${performance.play.name}: ${usd(performance.amount)} (${
      performance.audience
    } seats)\n`;
  }

  result += `Amount owed is ${usd(data.totalAmount)}\n`;
  result += `You earned ${data.totalVolumeCredits} credits\n`;
  return result;
};

const htmlStatement = (invoice: Invoice, plays: Plays): string => {
  return renderHtml(createStatementData(invoice, plays));
};

const renderHtml = (data: StatementData): string => {
  let result = `<h1>Statement for ${data.customer}</h1>\n`;
  result += "<table>\n";
  result += "<tr><th>play</th><th>seats</th><th>cost</th></tr>";
  for (const performance of data.performances) {
    result += `<tr><td>${performance.play.name}</td><td>${
      performance.audience
    }</td><td>${usd(performance.amount)}</td></tr>`;
  }
  result += "</table>";

  result += `<p>Amount owed is <em>${usd(data.totalAmount)}</em></p>\n`;
  result += `<p>You earned <em>${data.totalVolumeCredits}</em> credits</p>\n`;
  return result;
};

const usd = (number: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(number / 100);
};
