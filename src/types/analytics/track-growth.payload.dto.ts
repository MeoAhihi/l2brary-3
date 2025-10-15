export type CountNewUserPayload = {
  from: string; // YYYY-MM-DD
  to: string; // YYYY-MM-DD
};
export type getActiveUserPayload = { minscore: number };
export type getInactiveUserPayload = {
  maxscore: number;
  from: string; // YYYY-MM-DD
  to: string; // YYYY-MM-DD
};
export type getRetentionRate = {
  prevFrom: string; // YYYY-MM-DD
  prevTo: string; // YYYY-MM-DD
  currFrom: string; // YYYY-MM-DD
  currTo: string; // YYYY-MM-DD
};
