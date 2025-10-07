import { getActivityCategories } from "@/apis/activity.api";
import { queryKeys } from "@/constants/query-keys";
import { useQuery } from "@tanstack/react-query";

/**
 * Hook để lấy danh sách categories của activity
 */
export function useActivityCategoriesQuery() {
  return useQuery({
    queryKey: [...queryKeys.ld.activities, "categories"],
    queryFn: getActivityCategories,
    refetchOnWindowFocus: false,
  });
}
