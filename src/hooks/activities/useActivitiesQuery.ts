import { useQuery } from "@tanstack/react-query";

import { getActivities } from "@/apis/activity.api";
import { queryKeys } from "@/constants/query-keys";
import type { ActivityResponseDto } from "@/types/activities/activity";

export function useActivitiesQuery() {
  const query = useQuery({
    queryKey: queryKeys.ld.activities,
    queryFn: getActivities,
    select: (data) =>
      Array.isArray(data)
        ? data
            .filter((a) => a.category !== "system")
            .sort((a, b) => {
              const categoryCompare = String(a.category).localeCompare(
                String(b.category),
                "vi",
                { sensitivity: "base" },
              );
              if (categoryCompare !== 0) return categoryCompare;
              return String(a.name).localeCompare(String(b.name), "vi", {
                sensitivity: "base",
              });
            })
        : data,
    refetchOnWindowFocus: false,
  });

  return {
    ...query,
    activities: (query.data ?? []) as ActivityResponseDto[],
  };
}
