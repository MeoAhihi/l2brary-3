import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import {
  getAllActivities,
  getActivityById,
  getActivityCategories,
} from "@/apis/activity.api";
import { queryKeys } from "@/constants/query-keys";

/**
 * Hook để lấy danh sách tất cả activities
 */
export function useActivitiesQuery() {
  return useQuery({
    queryKey: queryKeys.ld.activities,
    queryFn: getAllActivities,
    refetchOnWindowFocus: false,
  });
}
