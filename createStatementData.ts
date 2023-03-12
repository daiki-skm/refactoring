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

  get play() {
    return this.#play;
  }

  get amount() {
    let result = 0;
    switch (this.#play.type) {
      case "tragedy":
        result = 40000;
        if (this.#performance.audience > 30) {
          result += 1000 * (this.#performance.audience - 30);
        }
        break;
      case "comedy":
        result = 30000;
        if (this.#performance.audience > 20) {
          result += 10000 + 500 * (this.#performance.audience - 20);
        }
        result += 300 * this.#performance.audience;
        break;
      default:
        throw new Error(`unknown type: ${this.#play.type}`);
    }
    return result;
  }

  get volumeCredits() {
    let result = 0;
    result += Math.max(this.#performance.audience - 30, 0);
    if ("comedy" === this.#play.type) {
      result += Math.floor(this.#performance.audience / 5);
    }
    return result;
  }
}

export const createStatementData = (invoice: Invoice, plays: Plays) => {
  const enrichPerformance = (performance: Performance) => {
    const calculator = new PerformanceCalculator(
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
