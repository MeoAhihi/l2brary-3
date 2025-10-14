export type UpsertScoreColumnRequest = {
  userId: string;
  scoer: number;
};
export type UpsertScoreColumnPayload = {
  scoreColumnId: number;
  data: UpsertScoreColumnRequest[];
};

export type ScoreTablePayload = {
  courseId: string;
};
