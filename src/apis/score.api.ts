import axiosClient from "@/connectors/AxiosRestConnector";
import { CreateScoreColumnDto } from "@/types/score/create-score-column.api.dto";
import {
  ScoreColumnItem,
  ScoreColumnResponseDto,
} from "@/types/score/score-column.response.dto";
import {
  ScoreTablePayload,
  UpsertScoreColumnPayload,
} from "@/types/score/score.payload.dto";
import { ScoreTableRow } from "@/types/score/score.response.dto";
import { UpdateScoreColumnDto } from "@/types/score/update-score-column.api.dto";

// Score Column APIs

// Create score column
export const createScoreColumn = (
  courseId: string,
  data: CreateScoreColumnDto,
) => {
  return axiosClient.post<ScoreColumnResponseDto>(
    `/v1/api/score/column/${courseId}`,
    data,
  );
};

// Get score columns
export const getScoreColumns = (
  courseId: string,
  params: { summarize: boolean },
) => {
  return axiosClient.get<ScoreColumnItem[]>(
    `/v1/api/score/column/${courseId}`,
    { params },
  );
};

// Get score column details
export const getScoreColumnDetails = (id: string) => {
  return axiosClient.get<ScoreColumnResponseDto>(
    `/v1/api/score/column/detail/${id}`,
  );
};

// Update score column
export const updateScoreColumn = (id: string, data: UpdateScoreColumnDto) => {
  return axiosClient.patch<ScoreColumnResponseDto>(
    `/v1/api/score/column/${id}`,
    data,
  );
};

// Delete score column
export const deleteScoreColumn = (id: string) => {
  return axiosClient.delete(`/v1/api/score/column/${id}`);
};

// Upsert scores
export const upsertScores = ({
  scoreColumnId,
  data,
}: UpsertScoreColumnPayload) => {
  return axiosClient.post(`/v1/api/score`, data, { params: { scoreColumnId } });
};

// Get score table
export const getScoreTable = (params: { courseId: string }) => {
  return axiosClient.get<ScoreTableRow[]>(`/v1/api/score/table`, { params });
};
