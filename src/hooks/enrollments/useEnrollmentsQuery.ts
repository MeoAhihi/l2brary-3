"use client";

import { useQuery } from "@tanstack/react-query";

import { getEnrollments } from "@/apis/enrollment.api";
import { queryKeys } from "@/constants/query-keys";
import type { GetEnrollmentsPayload } from "@/types/enrollment/payload";

/**
 * Hook để lấy danh sách enrollments với phân trang và filter
 * @param params - Query parameters (page, limit, courseId)
 * @returns React Query result với enrollments data
 */
export const useEnrollmentsQuery = (params?: GetEnrollmentsPayload) => {
  return useQuery({
    queryKey: [queryKeys.ld.enrollments, params],
    queryFn: () => getEnrollments(params),
    refetchOnWindowFocus: false,
  });
};
