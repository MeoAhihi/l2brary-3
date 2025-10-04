import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

// Generic API function type
type TableAPIFunction<TParams, TResponse> = (
  params?: Partial<TParams>,
) => Promise<TResponse>;

interface UseTableQueryOptions<TParams, TItem> {
  apiParams: Partial<TParams>;
  apiFunction: TableAPIFunction<TParams, { items: TItem[]; total: number }>;
  queryKeyPrefix: readonly string[];
  staleTime?: number;
  refetchOnWindowFocus?: boolean;
}

/**
 * Generic hook để quản lý table query với React Query
 * Có thể dùng cho any entity (courses, sessions, users, etc.)
 */
export function useTableQuery<TParams, TItem>({
  apiParams,
  apiFunction,
  queryKeyPrefix,
  staleTime,
  refetchOnWindowFocus = false,
}: UseTableQueryOptions<TParams, TItem>) {
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
    staleTime,
    refetchOnWindowFocus,
  });

  // Transform data
  const items: TItem[] = useMemo(() => data?.items ?? [], [data?.items]);
  const totalItems = useMemo(() => data?.total ?? 0, [data?.total]);

  // Computed states
  const hasData = items.length > 0;
  const isEmpty = isSuccess && !hasData;

  return {
    // Raw data
    data,
    items,
    totalItems,

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
