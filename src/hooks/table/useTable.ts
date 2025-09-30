import { useMemo } from "react";

import type { QueryParams } from "@/types/query";

import { useTableFilters } from "./useTableFilters";
import { useTablePagination } from "./useTablePagination";
import { useTableQuery } from "./useTableQuery";

interface UseTableOptions<TApiParams, TItem> {
  defaultPageSize: number;
  defaultFilters?: Partial<TApiParams>;
  transformFilters: (queryParams: QueryParams) => Partial<TApiParams>;
  apiFunction: (
    params?: Partial<TApiParams>,
  ) => Promise<{ items: TItem[]; total: number }>;
  queryKeyPrefix: readonly string[];
  staleTime?: number;
  refetchOnWindowFocus?: boolean;
  /**
   * Enable skeleton mode during initial loading
   * When true, returns skeleton data instead of empty array during first load
   */
  enableSkeleton?: boolean;
  /**
   * Number of skeleton rows to show during loading
   */
  skeletonRowCount?: number;
  /**
   * Force skeleton mode for testing (overrides normal conditions)
   */
  forceSkeleton?: boolean;
}

/**
 * Generic main table hook tổng hợp all table functionality
 * Universal table logic cho any entity
 */
export function useTable<TApiParams, TItem>({
  defaultPageSize,
  defaultFilters,
  transformFilters,
  apiFunction,
  queryKeyPrefix,
  staleTime,
  refetchOnWindowFocus,
  enableSkeleton = true,
  skeletonRowCount,
  forceSkeleton = false,
}: UseTableOptions<TApiParams, TItem>) {
  // 1. Filters management
  const {
    queryParams,
    apiParams,
    updateFilters,
    clearFilters,
    resetToFirstPage,
  } = useTableFilters({
    defaultPageSize,
    defaultFilters,
    transformFilters,
  });

  // 2. Data fetching
  const {
    items,
    totalItems,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
    hasData,
    isEmpty,
  } = useTableQuery({
    apiParams,
    apiFunction,
    queryKeyPrefix,
    staleTime,
    refetchOnWindowFocus,
  });

  // 3. Pagination logic
  const {
    pageIndex,
    pageSize,
    pageCount,
    handlePageChange,
    handlePageSizeChange,
    paginationProps,
  } = useTablePagination({
    queryParams,
    totalItems,
    setQueryParams: updateFilters,
    defaultPageSize,
  });

  // Skeleton mode logic
  const effectiveSkeletonRowCount =
    skeletonRowCount || pageSize || defaultPageSize;
  const shouldShowSkeleton = forceSkeleton || (enableSkeleton && isLoading);

  // Generate skeleton data when needed
  const skeletonData = useMemo(() => {
    if (!shouldShowSkeleton) return [];
    return Array.from({ length: effectiveSkeletonRowCount }, (_, index) => ({
      id: `skeleton-${index}`,
      __skeleton: true,
    })) as TItem[];
  }, [shouldShowSkeleton, effectiveSkeletonRowCount]);

  // Determine final display data
  const displayItems = shouldShowSkeleton ? skeletonData : items;
  const displayTotal = shouldShowSkeleton
    ? effectiveSkeletonRowCount
    : totalItems;

  return {
    // Data
    items: displayItems,
    totalItems: displayTotal,

    // States
    isLoading,
    isFetching,
    isError,
    error,
    hasData,
    isEmpty,

    // Skeleton states
    isSkeletonMode: shouldShowSkeleton,
    skeletonRowCount: effectiveSkeletonRowCount,

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
