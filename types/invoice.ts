import type { Performance as PlayPerformance } from "./plays.ts";

export type Invoice = {
  customer: string;
  performances: Performance[];
};

export type Performance = {
  playid: string;
  audience: number;
  play: PlayPerformance;
  amount: number;
  volumeCredits: number;
};
