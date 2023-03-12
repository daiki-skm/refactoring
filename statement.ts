import type { Invoice } from "./types/invoice.ts";
import type { Plays } from "./types/plays.ts";
import type { StatementData } from "./types/statement.ts";
import { createStatementData } from "./createStatementData.ts";

export const statement = (invoice: Invoice, plays: Plays) => {
  return renderPlainText(createStatementData(invoice, plays));
};

const renderPlainText = (data: StatementData) => {
  const usd = (number: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(number / 100);
  };

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
