import { useQuery } from "@tanstack/react-query";

import { getUserActivityReport } from "@/apis/activity.api";
import { queryKeys } from "@/constants/query-keys";
import type { UserActivityReport } from "@/types/activities/gamification";

export function useUserActivityReportQuery(userId: string) {
  const queryResult = useQuery({
    queryKey: [...queryKeys.ld.userActivityReport, userId],
    queryFn: () => getUserActivityReport(userId),
    refetchOnWindowFocus: false,
    enabled: !!userId, // Only run query if userId is provided
  });

  return {
    ...queryResult,
    userActivityReport: queryResult.data as UserActivityReport | undefined,
  };
}
