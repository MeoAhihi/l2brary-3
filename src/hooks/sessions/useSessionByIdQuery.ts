import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { getSessionById } from "@/apis/session.api";
import { queryKeys } from "@/constants/query-keys";
import type { SessionDto } from "@/types/session/session.dto";

interface UseSessionByIdQueryOptions {
  sessionId: string;
  enabled?: boolean;
}

/**
 * Hook to fetch a single session by ID
 */
export function useSessionByIdQuery({
  sessionId,
  enabled = true,
}: UseSessionByIdQueryOptions) {
  // Generate query key
  const queryKey = useMemo(
    () => [...queryKeys.ld.sessions, "detail", sessionId],
    [sessionId],
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
    queryFn: () => getSessionById(sessionId),
    enabled: enabled && !!sessionId,
    refetchOnWindowFocus: false,
  });

  // Transform data
  const session: SessionDto | undefined = useMemo(() => data, [data]);

  // Computed states
  const hasData = !!session;

  return {
    // Raw data
    data,
    session,

    // Query states
    isLoading,
    isFetching,
    isError,
    error,
    isSuccess,
    isPending,

    // Computed states
    hasData,

    // Actions
    refetch,

    // For debugging
    queryKey,
  };
}
