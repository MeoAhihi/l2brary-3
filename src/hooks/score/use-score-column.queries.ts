import { getScoreColumns, getScoreColumnDetails } from "@/apis/score.api";
import { useQuery } from "@tanstack/react-query";

export const useScoreColumns = (
  courseId: string,
  params: { summarize: boolean },
) => {
  return useQuery({
    queryKey: ["score-columns", courseId, params],
    queryFn: () => getScoreColumns(courseId, params),
  });
};

export const useScoreColumnDetails = (id: string) => {
  return useQuery({
    queryKey: ["score-column-details", id],
    queryFn: () => getScoreColumnDetails(id),
  });
};
