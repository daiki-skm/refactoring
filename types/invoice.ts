export type Invoice = {
  customer: string;
  performances: Performance[];
};

export type Performance = {
  playid: string;
  audience: number;
};
