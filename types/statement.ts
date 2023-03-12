import type { Invoice } from "./invoice.ts";

export type StatementData = {
  [P in keyof Invoice]: Invoice[P];
} & {
  totalAmount: number;
  totalVolumeCredits: number;
};
