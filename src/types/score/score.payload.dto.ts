export interface UpsertScoreColumnRequest {
  userId: string;
  score: number;
}

export interface UpsertScoreColumnPayload {
  scoreColumnId: number;
  data: UpsertScoreColumnRequest[];
}

export interface ScoreTablePayload {
  courseId: string;
}
