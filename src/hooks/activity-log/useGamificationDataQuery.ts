import { useQuery } from "@tanstack/react-query";

import { getGamificationData } from "@/apis/activity.api";
import { queryKeys } from "@/constants/query-keys";
import type {
  ActivityLogType,
  GetAllActivityLogsQuery,
} from "@/types/activities/gamification";

export function useGamificationDataQuery(query: GetAllActivityLogsQuery) {
  const queryResult = useQuery({
    queryKey: [...queryKeys.ld.activityLogs, query],
    queryFn: () => getGamificationData(query),
    refetchOnWindowFocus: false,
  });

  return {
    ...queryResult,
    activityLogs: (queryResult.data ?? []) as ActivityLogType[],
  };
}
