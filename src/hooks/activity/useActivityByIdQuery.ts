import { getActivityById } from "@/apis/activity.api";
import { queryKeys } from "@/constants/query-keys";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

/**
 * Hook để lấy chi tiết activity theo id
 * @param id activity id
 */
export function useActivityByIdQuery(id?: number) {
  return useQuery({
    queryKey: useMemo(() => [...queryKeys.ld.activities, id], [id]),
    queryFn: () =>
      id !== undefined ? getActivityById(id) : Promise.reject("No id provided"),
    enabled: id !== undefined,
    refetchOnWindowFocus: false,
  });
}
