import type { Invoice, Performance } from "./types/invoice.ts";
import type { Plays, Performance as PlayPerformance } from "./types/plays.ts";

export const statement = (invoice: Invoice, plays: Plays) => {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;

  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format;

  const amountFor = (performance: Performance) => {
    let result = 0;
    switch (playFor(performance).type) {
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
        throw new Error(`unknown type: ${playFor(performance).type}`);
    }
    return result;
  };

  const playFor = (performance: Performance) => {
    return plays[performance.playid];
  };

  for (const perf of invoice.performances) {
    volumeCredits += Math.max(perf.audience - 30, 0);
    if ("comedy" === playFor(perf).type) {
      volumeCredits += Math.floor(perf.audience / 5);
    }
    result += `${playFor(perf).name}: ${format(amountFor(perf) / 100)} (${
      perf.audience
    } seats)\n`;
    totalAmount += amountFor(perf);
  }

  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits\n`;
  return result;
};
