import { useQuery } from "@tanstack/react-query";

import { getScoreTable } from "@/apis/score.api";
import { queryKeys } from "@/constants/query-keys";

/**
 * Custom hook to fetch score table data by course ID.
 * @param courseId The course ID for which to fetch the score table.
 */
export const useScoreTableQuery = (courseId: string) => {
  return useQuery({
    queryKey: queryKeys.ld.scoreTable(courseId),
    queryFn: () => getScoreTable({ courseId }),
    select: (data) => data.data,
    enabled: !!courseId,
  });
};
