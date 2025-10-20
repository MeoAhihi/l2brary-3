export type CountNewUserPayload = {
  from: string; // YYYY-MM-DD
  to: string; // YYYY-MM-DD
};
export type GetActiveUserPayload = { minscore: number };
export type GetInactiveUserPayload = {
  maxscore: number;
  from: string; // YYYY-MM-DD
  to: string; // YYYY-MM-DD
};
export type GetRetentionRatePayload = {
  prevFrom: string; // YYYY-MM-DD
  prevTo: string; // YYYY-MM-DD
  currFrom: string; // YYYY-MM-DD
  currTo: string; // YYYY-MM-DD
};
