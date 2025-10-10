import { useMemo } from "react";

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/constants/common";
import type { QueryParams } from "@/types/query";

interface UseEnrollmentsPaginationProps {
  queryParams: QueryParams;
  totalItems: number;
  setQueryParams: (params: Partial<QueryParams>) => void;
  defaultPageSize?: number;
}

/**
 * Custom hook để quản lý pagination logic cho enrollments table
 * Handles URL-based pagination với server-side support
 */
export function useEnrollmentsPagination({
  queryParams,
  totalItems,
  setQueryParams,
  defaultPageSize = DEFAULT_PAGE_SIZE,
}: UseEnrollmentsPaginationProps) {
  // Calculate pagination state for DataTable
  const pageIndex = useMemo(
    () => (queryParams.page ?? DEFAULT_PAGE_INDEX) - 1, // Convert to 0-based
    [queryParams.page],
  );

  const pageSize = useMemo(
    () => queryParams.limit ?? defaultPageSize,
    [queryParams.limit, defaultPageSize],
  );

  // Calculate total pages for server-side pagination
  const pageCount = useMemo(
    () => Math.ceil(totalItems / pageSize),
    [totalItems, pageSize],
  );

  // Pagination handlers for URL sync
  const handlePageChange = (page: number) => {
    setQueryParams({ page });
  };

  const handlePageSizeChange = (limit: number) => {
    setQueryParams({ page: 1, limit }); // Reset to first page when changing page size
  };

  // Navigation helpers
  const goToFirstPage = () => {
    handlePageChange(1);
  };

  const goToLastPage = () => {
    handlePageChange(pageCount);
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= pageCount) {
      handlePageChange(page);
    }
  };

  const canGoToPrevious = pageIndex > 0;
  const canGoToNext = pageIndex < pageCount - 1;

  return {
    // Current state
    pageIndex,
    pageSize,
    pageCount,
    totalItems,
    currentPage: pageIndex + 1, // 1-based for display

    // Navigation state
    canGoToPrevious,
    canGoToNext,

    // Handlers
    handlePageChange,
    handlePageSizeChange,

    // Navigation helpers
    goToFirstPage,
    goToLastPage,
    goToPage,

    // DataTable props
    paginationProps: {
      initialPageIndex: pageIndex,
      initialPageSize: pageSize,
      manualPagination: true,
      pageCount,
    },
  };
}
