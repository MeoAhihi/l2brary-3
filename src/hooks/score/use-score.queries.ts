import { getScoreTable } from "@/apis/score.api";
import { useQuery } from "@tanstack/react-query";

/**
 * Custom hook to fetch score table data by course ID.
 * @param courseId The course ID for which to fetch the score table.
 */
export const useScoreTableQuery = (courseId: string) => {
  return useQuery({
    queryKey: ["score-table", courseId],
    queryFn: () => getScoreTable({ courseId }),
    select: (data) => data.data,
    enabled: !!courseId,
  });
};
