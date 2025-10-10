import { useQuery } from "@tanstack/react-query";

import { getActivities } from "@/apis/activity.api";
import { queryKeys } from "@/constants/query-keys";
import type { ActivityResponseDto } from "@/types/activities/activity";

export function useActivitiesQuery() {
  const query = useQuery({
    queryKey: queryKeys.ld.activities,
    queryFn: getActivities,
    refetchOnWindowFocus: false,
  });

  return {
    ...query,
    activities: (query.data ?? []) as ActivityResponseDto[],
  };
}
