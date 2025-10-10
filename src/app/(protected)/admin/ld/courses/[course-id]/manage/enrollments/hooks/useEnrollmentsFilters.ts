import { useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/constants/common";
import type { QueryParams } from "@/types/query";

interface UseEnrollmentsFiltersProps {
  defaultPageSize?: number;
  courseId?: string;
}

/**
 * Custom hook để quản lý filters và URL sync cho enrollments
 */
export function useEnrollmentsFilters({
  defaultPageSize = DEFAULT_PAGE_SIZE,
  courseId,
}: UseEnrollmentsFiltersProps = {}) {
  const searchParams = useSearchParams();

  // Parse URL params
  const queryParams: QueryParams = {
    page: Number(searchParams.get("page")) || DEFAULT_PAGE_INDEX,
    limit: Number(searchParams.get("limit")) || defaultPageSize,
    search: searchParams.get("search") || undefined,
  };

  // API params for server requests
  const apiParams = {
    page: queryParams.page,
    limit: queryParams.limit,
    courseId,
  };

  const [filters, setFilters] = useState(queryParams);

  const updateFilters = useCallback(
    (newParams: Partial<QueryParams>) => {
      const updated = { ...filters, ...newParams };
      setFilters(updated);

      // Update URL
      const url = new URL(window.location.href);
      Object.entries(updated).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          url.searchParams.set(key, String(value));
        } else {
          url.searchParams.delete(key);
        }
      });
      window.history.replaceState({}, "", url.toString());
    },
    [filters],
  );

  const clearFilters = useCallback(() => {
    const cleared: QueryParams = {
      page: DEFAULT_PAGE_INDEX,
      limit: defaultPageSize,
    };
    setFilters(cleared);

    // Clear URL
    const url = new URL(window.location.href);
    url.search = "";
    window.history.replaceState({}, "", url.toString());
  }, [defaultPageSize]);

  const resetToFirstPage = useCallback(() => {
    updateFilters({ page: DEFAULT_PAGE_INDEX });
  }, [updateFilters]);

  return {
    queryParams: filters,
    apiParams: {
      ...apiParams,
      page: filters.page,
      limit: filters.limit,
    },
    updateFilters,
    clearFilters,
    resetToFirstPage,
  };
}
