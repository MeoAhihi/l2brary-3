import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { getCourseSessions } from "@/apis/session.api";
import { queryKeys } from "@/constants/query-keys";
import type { GetAllSessionPayload } from "@/types/session/get-all-session.api.dto";
import type { SessionDto } from "@/types/session/session.dto";

// Type for API function to be flexible
type SessionsAPIFunction = (
  params: GetAllSessionPayload,
) => Promise<SessionDto>;

interface UseSessionsQueryOptions {
  apiParams: GetAllSessionPayload;
  apiFunction?: SessionsAPIFunction;
  queryKeyPrefix?: readonly string[];
  enabled?: boolean;
}

/**
 * Generic hook to manage sessions query with React Query
 * Can be used for both admin and public contexts
 */
export function useSessionsQuery({
  apiParams,
  apiFunction = getCourseSessions,
  queryKeyPrefix = queryKeys.ld.sessions,
  enabled = true,
}: UseSessionsQueryOptions) {
  // Generate query key
  const queryKey = useMemo(
    () => [...queryKeyPrefix, "course", apiParams.courseId, apiParams],
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
    enabled,
    refetchOnWindowFocus: false,
  });

  // Transform data
  const sessions: SessionDto[] = useMemo(() => {
    if (Array.isArray(data)) {
      return data;
    }
    return [];
  }, [data]);

  // Computed states
  const hasData = sessions.length > 0;
  const isEmpty = isSuccess && !hasData;

  return {
    // Raw data
    data,
    sessions,

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
