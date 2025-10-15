import { PlusScoreDto } from "./plus-score.dto";

export type CreateGamePayload = {
  sessionId: number;
};
export type GetGameListPayload = {
  sessionId: number;
};

export type SubmitGamePayload = {
  gameId: number;
};

export type LogGameRequestItem = {
  userId: string;
  score: number;
  timePlayed: number;
  triedTimes: number;
  plusScores: PlusScoreDto[];
};

export type LogGameRequest = LogGameRequestItem[];
