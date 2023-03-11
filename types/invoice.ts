export type Invoice = {
  customer: string;
  performances: Performance[];
};

type Performance = {
  playid: string;
  audience: number;
};
