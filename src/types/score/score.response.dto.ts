import { RefUserDto } from "../user/ref-user.dto";
import { ScoreColumnItem } from "./score-column.response.dto";

export interface ScoreTableRow {
  user: RefUserDto;
  scores: {
    score: number;
    scoreColumn: ScoreColumnItem;
  }[]; // ← Array of scores for multiple columns
  average?: number;
}
