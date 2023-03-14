import type { Invoice, Performance } from "./types/invoice.ts";
import type { Plays, Performance as PlayPerformance } from "./types/plays.ts";
import type { StatementData } from "./types/statement.ts";

class PerformanceCalculator {
  #performance: Performance;
  #play: PlayPerformance;

  constructor(performance: Performance, play: PlayPerformance) {
    this.#performance = performance;
    this.#play = play;
  }

  get play(): PlayPerformance {
    return this.#play;
  }

  get performance(): Performance {
    return this.#performance;
  }

  get amount(): number {
    throw new Error("subclass responsibility");
  }

  get volumeCredits(): number {
    return Math.max(this.#performance.audience - 30, 0);
  }
}

class TragedyCalculator extends PerformanceCalculator {
  get amount(): number {
    let result = 40000;
    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30);
    }
    return result;
  }
}

class ComedyCalculator extends PerformanceCalculator {
  get amount(): number {
    let result = 30000;
    if (this.performance.audience > 20) {
      result += 10000 + 500 * (this.performance.audience - 20);
    }
    result += 300 * this.performance.audience;
    return result;
  }

  get volumeCredits(): number {
    return super.volumeCredits + Math.floor(this.performance.audience / 5);
  }
}

const createPerformanceCalculator = (
  performance: Performance,
  play: PlayPerformance
) => {
  switch (play.type) {
    case "tragedy":
      return new TragedyCalculator(performance, play);
    case "comedy":
      return new ComedyCalculator(performance, play);
    default:
      throw new Error(`unknown type: ${play.type}`);
  }
};

export const createStatementData = (
  invoice: Invoice,
  plays: Plays
): StatementData => {
  const enrichPerformance = (performance: Performance) => {
    const calculator = createPerformanceCalculator(
      performance,
      playFor(performance)
    );
    const result = Object.assign({}, performance);
    result.play = calculator.play;
    result.amount = calculator.amount;
    result.volumeCredits = calculator.volumeCredits;
    return result;
  };

  const playFor = (performance: Performance) => {
    return plays[performance.playid];
  };

  const totalVolumeCredits = (performances: Performance[]) => {
    return performances.reduce((total, p) => total + p.volumeCredits, 0);
  };

  const totalAmount = (performances: Performance[]) => {
    return performances.reduce((total, p) => total + p.amount, 0);
  };

  const incompleteStatementData = {
    customer: invoice.customer,
    performances: invoice.performances.map(enrichPerformance),
  };
  const result: StatementData = {
    ...incompleteStatementData,
    totalAmount: totalAmount(incompleteStatementData.performances),
    totalVolumeCredits: totalVolumeCredits(
      incompleteStatementData.performances
    ),
  };
  return result;
};
