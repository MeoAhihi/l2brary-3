import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { getCourses } from "@/apis/course.api";
import { queryKeys } from "@/constants/query-keys";
import type { GetCoursePayload } from "@/types/courses/payload";
import type { CourseItem } from "@/types/courses/response";

// Type cho API function để flexible
type CourseAPIFunction = (
  params?: Partial<GetCoursePayload>,
) => Promise<{ items: CourseItem[]; total: number }>;

interface UseCoursesQueryOptions {
  apiParams: Partial<GetCoursePayload>;
  apiFunction?: CourseAPIFunction;
  queryKeyPrefix?: readonly string[];
}

/**
 * Generic hook để quản lý courses query với React Query
 * Có thể dùng cho cả admin và public contexts
 */
export function useCoursesQuery({
  apiParams,
  apiFunction = getCourses,
  queryKeyPrefix = queryKeys.ld.courses,
}: UseCoursesQueryOptions) {
  // Generate query key
  const queryKey = useMemo(
    () => [...queryKeyPrefix, apiParams],
    [queryKeyPrefix, apiParams],
  );

  // React Query
  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
    isSuccess,
    isPending,
  } = useQuery({
    queryKey,
    queryFn: () => apiFunction(apiParams),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  // Transform data
  const courses: CourseItem[] = useMemo(() => data?.items ?? [], [data?.items]);

  const totalCourses = useMemo(() => data?.total ?? 0, [data?.total]);

  // Computed states
  const hasData = courses.length > 0;
  const isEmpty = isSuccess && !hasData;

  return {
    // Raw data
    data,
    courses,
    totalCourses,

    // Query states
    isLoading,
    isFetching,
    isError,
    error,
    isSuccess,
    isPending,

    // Computed states
    hasData,
    isEmpty,

    // Actions
    refetch,

    // For debugging
    queryKey,
  };
}
