import { useMemo } from "react";

import { DEFAULT_PAGE_INDEX } from "@/constants/common";
import { useQueryFilters } from "@/hooks/useQueryFilters";
import type { QueryParams } from "@/types/query";

type FilterTransformer<TApiParams> = (
  queryParams: QueryParams,
) => Partial<TApiParams>;

interface UseTableFiltersOptions<TApiParams> {
  defaultPageSize: number;
  defaultFilters?: Partial<TApiParams>;
  transformFilters: FilterTransformer<TApiParams>;
}

/**
 * Generic hook để quản lý table filters với URL synchronization
 * Có thể dùng cho any entity với custom filter transformation logic
 */
export function useTableFilters<TApiParams>({
  defaultPageSize,
  defaultFilters = {},
  transformFilters,
}: UseTableFiltersOptions<TApiParams>) {
  const defaultParams = useMemo(
    () => ({
      page: DEFAULT_PAGE_INDEX,
      limit: defaultPageSize,
      ...defaultFilters,
    }),
    [defaultPageSize, defaultFilters],
  );

  const { queryParams, setQueryParams } = useQueryFilters(defaultParams);

  // Transform URL params to API payload với custom logic
  const apiParams = useMemo<Partial<TApiParams>>(() => {
    const baseParams = {
      page: queryParams.page ?? DEFAULT_PAGE_INDEX,
      limit: queryParams.limit ?? defaultPageSize,
    };

    const transformedParams = transformFilters(queryParams);

    return {
      ...baseParams,
      ...transformedParams,
    } as Partial<TApiParams>;
  }, [queryParams, defaultPageSize, transformFilters]);

  // Helper functions cho filter updates
  const updateFilters = (filters: Partial<QueryParams>) => {
    setQueryParams(filters);
  };

  const clearFilters = () => {
    setQueryParams({
      page: DEFAULT_PAGE_INDEX,
      limit: defaultPageSize,
      ...defaultFilters,
    });
  };

  const resetToFirstPage = () => {
    setQueryParams({ page: DEFAULT_PAGE_INDEX });
  };

  return {
    queryParams,
    apiParams,
    updateFilters,
    clearFilters,
    resetToFirstPage,
  };
}
