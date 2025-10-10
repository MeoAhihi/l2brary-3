import { useQuery } from "@tanstack/react-query";

import { getActivityCategories } from "@/apis/activity.api";
import { queryKeys } from "@/constants/query-keys";

export function useActivityCategoriesQuery() {
  return useQuery({
    queryKey: queryKeys.ld.activityCategories,
    queryFn: getActivityCategories,
    refetchOnWindowFocus: false,
  });
}
