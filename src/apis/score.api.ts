import axiosClient from "@/connectors/AxiosRestConnector";
import { CreateScoreColumnDto } from "@/types/score/create-score-column.api.dto";
import {
  ScoreTablePayload,
  UpsertScoreColumnPayload,
} from "@/types/score/score.payload.dto";
import { ScoreTableRow } from "@/types/score/score.response.dto";
import {
  ScoreColumnItem,
  ScoreColumnResponseDto,
} from "@/types/score/score-column.response.dto";
import { UpdateScoreColumnDto } from "@/types/score/update-score-column.api.dto";

// Score Column APIs

// Create score column
export const createScoreColumn = (
  courseId: string,
  data: CreateScoreColumnDto,
) => {
  return axiosClient.post<ScoreColumnResponseDto>(
    `/score/column/${courseId}`,
    data,
  );
};

// Get score columns
export const getScoreColumns = (
  courseId: string,
  params: { summarize: boolean },
) => {
  return axiosClient.get<ScoreColumnItem[]>(`/score/column/${courseId}`, {
    params,
  });
};

// Get score column details
export const getScoreColumnDetails = (id: string) => {
  return axiosClient.get<ScoreColumnResponseDto>(`/score/column/detail/${id}`);
};

// Update score column
export const updateScoreColumn = (id: string, data: UpdateScoreColumnDto) => {
  return axiosClient.patch<ScoreColumnResponseDto>(`/score/column/${id}`, data);
};

// Delete score column
export const deleteScoreColumn = (id: string) => {
  return axiosClient.delete(`/score/column/${id}`);
};

// Upsert scores
export const upsertScores = ({
  scoreColumnId,
  data,
}: UpsertScoreColumnPayload) => {
  return axiosClient.post(`/score`, data, { params: { scoreColumnId } });
};

// Get score table
export const getScoreTable = (params: { courseId: string }) => {
  return axiosClient.get<ScoreTableRow[]>(`/score/table`, { params });
};
