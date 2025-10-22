import { useQuery } from "@tanstack/react-query";

import { getScoreColumnDetails, getScoreColumns } from "@/apis/score.api";
import { queryKeys } from "@/constants/query-keys";

export const useScoreColumns = (
  courseId: string,
  params: { summarize: boolean },
) => {
  return useQuery({
    queryKey: [...queryKeys.ld.scoreColumns, courseId, params] as const,
    queryFn: () => getScoreColumns(courseId, params),
    select: (data) => data.data, // ← Extract data từ AxiosResponse
  });
};

export const useScoreColumnDetails = (id: string) => {
  return useQuery({
    queryKey: queryKeys.ld.scoreColumnDetails(id),
    queryFn: () => getScoreColumnDetails(id),
    select: (data) => data.data, // ← Extract data từ AxiosResponse
  });
};
