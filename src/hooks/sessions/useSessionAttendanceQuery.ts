import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { getSessionAttendance } from "@/apis/session.api";
import { queryKeys } from "@/constants/query-keys";

interface UseSessionAttendanceQueryOptions {
  sessionId: string;
  enabled?: boolean;
}

/**
 * Hook to fetch session attendance data
 */
export function useSessionAttendanceQuery({
  sessionId,
  enabled = true,
}: UseSessionAttendanceQueryOptions) {
  // Generate query key
  const queryKey = useMemo(
    () => [...queryKeys.ld.sessions, "attendance", sessionId],
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
    queryFn: () => getSessionAttendance(sessionId),
    enabled: enabled && !!sessionId,
    refetchOnWindowFocus: false,
  });

  // Computed states
  const hasData = !!data;

  return {
    // Raw data
    data,

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
