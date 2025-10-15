import { ReferenceCourseDto } from "../courses/reference-course.dto";
import { ScoreColumnItem } from "../score/score-column.response.dto";
import { ReferenceSessionDto } from "../session/ref-session.dto";
import { RefUserDto } from "../user/ref-user.dto";

export type CreateGameResponse = {
  id: number;
  session: ReferenceSessionDto;
  isSubmitted: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
};

export type GameLogDto = {
  gameId: number;
  score: number;
  timePlayed: number; // in seconds
  triedTimes: number;
};

export type GetGameListItem = {
  id: number;
  gameLogs: GameLogDto[];
  isSubmitted: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
};

export type GetGameListResponse = GetGameListItem[];

export type GameScoreColumnDto = {
  id: number;
  name: string;
};

export type PlusScoreLogDto = {
  scoreColumn: GameScoreColumnDto;
  score: number;
};

export type GameLogFullDto = {
  gameId: number;
  user: RefUserDto;
  plusScoreLogs: PlusScoreLogDto[];
  score: number;
  timePlayed: number; // in seconds
  triedTimes: number;
};

export type SubmitGameResponse = {
  message: string;
  game: {
    id: number;
    session: ReferenceSessionDto;
    gameLogs: GameLogFullDto[];
    isSubmitted: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
  scores: { user: RefUserDto; scoreColumn: ScoreColumnItem; score: number }[];
};

export type GetOneGameResponse = {
  id: number;
  session: {
    id: number;
    thumbnail?: string;
    title: string;
  };
  gameLogs: GameLogFullDto[];
  isSubmitted: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
};
