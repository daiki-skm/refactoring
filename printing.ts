import type { Invoice, Performance } from "./types/invoice.ts";
import type { Plays } from "./types/plays.ts";
type StatementData = {
  [P in keyof Invoice]: Invoice[P];
};

export const statement = (invoice: Invoice, plays: Plays) => {
  const enrichPerformance = (performance: Performance) => {
    const result = Object.assign({}, performance);
    result.play = playFor(result);
    return result;
  };

  const playFor = (performance: Performance) => {
    return plays[performance.playid];
  };

  const statementData: StatementData = {
    customer: invoice.customer,
    performances: invoice.performances.map(enrichPerformance),
  };
  return renderPlainText(statementData, plays);
};

const renderPlainText = (data: StatementData, plays: Plays) => {
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

  const usd = (number: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(number / 100);
  };

  const totalVolumeCredits = () => {
    let result = 0;
    for (const perf of data.performances) {
      result += volumeCreditsFor(perf);
    }
    return result;
  };

  const totalAmount = () => {
    let result = 0;
    for (const perf of data.performances) {
      result += amountFor(perf);
    }
    return result;
  };

  let result = `Statement for ${data.customer}\n`;
  for (const perf of data.performances) {
    result += `${perf.play.name}: ${usd(amountFor(perf))} (${
      perf.audience
    } seats)\n`;
  }

  result += `Amount owed is ${usd(totalAmount())}\n`;
  result += `You earned ${totalVolumeCredits()} credits\n`;
  return result;
};
