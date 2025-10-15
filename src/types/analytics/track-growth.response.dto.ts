export type countingResponse = {
  count: number;
};
export type getUserItem = {
  userId: string;
  name: string;
  totalScore: string;
};
export type getUserListResponse = getUserItem[];
export type retentionRateResponse = {
  retentionRate: number;
};
export type MonthlyUserGrowthItem = {
  month: string; // Format: YYYY-MM
  count: number;
};

export type MonthlyUserGrowthResponse = MonthlyUserGrowthItem[];
