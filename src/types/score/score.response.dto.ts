import { RefUserDto } from "../user/ref-user.dto";
import { ScoreColumnItem } from "./score-column.response.dto";

export type ScoreTableRow = {
  user: RefUserDto;
  score: {
    score: number;
    scoreColumn: ScoreColumnItem;
  };
  average: number;
};
