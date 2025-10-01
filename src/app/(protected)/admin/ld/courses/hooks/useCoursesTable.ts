import { getCourses } from "@/apis/course.api";
import { ADMIN_COURSE_PAGE_SIZE } from "@/constants/common";
import { queryKeys } from "@/constants/query-keys";

import { useCourseFilters } from "./useCourseFilters";
import { useCoursePagination } from "./useCoursePagination";
import { useCoursesQuery } from "./useCoursesQuery";

interface UseCoursesTableOptions {
  defaultPageSize?: number;
  defaultIsPublic?: boolean;
  apiFunction?: Parameters<typeof useCoursesQuery>[0]["apiFunction"];
  queryKeyPrefix?: readonly string[];
}

/**
 * Main hook tổng hợp logic cho CoursesTable component
 * Có thể dùng cho cả admin và public contexts
 */
export function useCoursesTable(options: UseCoursesTableOptions = {}) {
  const {
    defaultPageSize = ADMIN_COURSE_PAGE_SIZE,
    defaultIsPublic,
    apiFunction = getCourses,
    queryKeyPrefix = queryKeys.ld.courses,
  } = options;
  // 1. Filters management
  const {
    queryParams,
    apiParams,
    updateFilters,
    clearFilters,
    resetToFirstPage,
  } = useCourseFilters({ defaultPageSize, defaultIsPublic });

  // 2. Data fetching
  const {
    courses,
    totalCourses,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
    hasData,
    isEmpty,
  } = useCoursesQuery({ apiParams, apiFunction, queryKeyPrefix });

  // 3. Pagination logic
  const {
    pageIndex,
    pageSize,
    pageCount,
    handlePageChange,
    handlePageSizeChange,
    paginationProps,
  } = useCoursePagination({
    queryParams,
    totalItems: totalCourses,
    setQueryParams: updateFilters,
    defaultPageSize,
  });

  return {
    // Data
    courses,
    totalCourses,

    // States
    isLoading,
    isFetching,
    isError,
    error,
    hasData,
    isEmpty,

    // Pagination
    pageIndex,
    pageSize,
    pageCount,
    paginationProps,

    // Handlers
    handlePageChange,
    handlePageSizeChange,
    updateFilters,
    clearFilters,
    resetToFirstPage,
    refetch,

    // Raw access (if needed)
    queryParams,
    apiParams,
  };
}
