export type CountingResponse = {
  count: number;
};
export type GetUserItem = {
  userId: string;
  name: string;
  totalScore: string;
};
export type GetUserListResponse = GetUserItem[];
export type RetentionRateResponse = {
  retentionRate: number;
};
export type MonthlyUserGrowthItem = {
  month: string; // Format: YYYY-MM
  count: number;
};

export type MonthlyUserGrowthResponse = MonthlyUserGrowthItem[];
