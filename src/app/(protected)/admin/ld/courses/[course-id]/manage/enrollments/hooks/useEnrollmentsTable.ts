import { getEnrollments } from "@/apis/enrollment.api";
import { DEFAULT_PAGE_SIZE } from "@/constants/common";
import { useEnrollmentsQuery } from "@/hooks/enrollments";

import { useEnrollmentsFilters } from "./useEnrollmentsFilters";
import { useEnrollmentsPagination } from "./useEnrollmentsPagination";

interface UseEnrollmentsTableOptions {
  courseId: string;
  defaultPageSize?: number;
}

/**
 * Main hook tổng hợp logic cho EnrollmentsTable component
 */
export function useEnrollmentsTable({
  courseId,
  defaultPageSize = DEFAULT_PAGE_SIZE,
}: UseEnrollmentsTableOptions) {
  // 1. Filters management
  const {
    queryParams,
    apiParams,
    updateFilters,
    clearFilters,
    resetToFirstPage,
  } = useEnrollmentsFilters({
    defaultPageSize,
    courseId,
  });

  // 2. Data fetching
  const { data, isLoading, isFetching, isError, error, refetch } =
    useEnrollmentsQuery(apiParams);

  const enrollments = data?.items || [];
  const totalEnrollments = data?.total || 0;

  // 3. Pagination logic
  const {
    pageIndex,
    pageSize,
    pageCount,
    handlePageChange,
    handlePageSizeChange,
    paginationProps,
  } = useEnrollmentsPagination({
    queryParams,
    totalItems: totalEnrollments,
    setQueryParams: updateFilters,
    defaultPageSize,
  });

  return {
    // Data
    enrollments,
    totalEnrollments,

    // States
    isLoading,
    isFetching,
    isError,
    error,

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
