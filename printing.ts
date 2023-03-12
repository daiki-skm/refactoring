import type { Invoice, Performance } from "./types/invoice.ts";
import type { Plays } from "./types/plays.ts";
type StatementData = {
  [P in keyof Invoice]: Invoice[P];
} & {
  totalAmount: number;
  totalVolumeCredits: number;
};

export const statement = (invoice: Invoice, plays: Plays) => {
  const enrichPerformance = (performance: Performance) => {
    const result = Object.assign({}, performance);
    result.play = playFor(result);
    result.amount = amountFor(result);
    result.volumeCredits = volumeCreditsFor(result);
    return result;
  };

  const playFor = (performance: Performance) => {
    return plays[performance.playid];
  };

  const amountFor = (performance: Performance) => {
    let result = 0;
    switch (performance.play.type) {
      case "tragedy":
        result = 40000;
        if (performance.audience > 30) {
          result += 1000 * (performance.audience - 30);
        }
        break;
      case "comedy":
        result = 30000;
        if (performance.audience > 20) {
          result += 10000 + 500 * (performance.audience - 20);
        }
        result += 300 * performance.audience;
        break;
      default:
        throw new Error(`unknown type: ${performance.play.type}`);
    }
    return result;
  };

  const volumeCreditsFor = (performance: Performance) => {
    let result = 0;
    result += Math.max(performance.audience - 30, 0);
    if ("comedy" === performance.play.type) {
      result += Math.floor(performance.audience / 5);
    }
    return result;
  };

  const totalVolumeCredits = (performances: Performance[]) => {
    let result = 0;
    for (const performance of performances) {
      result += performance.volumeCredits;
    }
    return result;
  };

  const totalAmount = (performances: Performance[]) => {
    let result = 0;
    for (const performance of performances) {
      result += performance.amount;
    }
    return result;
  };

  const incompleteStatementData = {
    customer: invoice.customer,
    performances: invoice.performances.map(enrichPerformance),
  };
  const statementData = {
    ...incompleteStatementData,
    totalAmount: totalAmount(incompleteStatementData.performances),
    totalVolumeCredits: totalVolumeCredits(
      incompleteStatementData.performances
    ),
  };
  return renderPlainText(statementData);
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
  for (const perf of data.performances) {
    result += `${perf.play.name}: ${usd(perf.amount)} (${
      perf.audience
    } seats)\n`;
  }

  result += `Amount owed is ${usd(data.totalAmount)}\n`;
  result += `You earned ${data.totalVolumeCredits} credits\n`;
  return result;
};
