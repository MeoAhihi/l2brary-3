import {
  GetActiveUserPayload,
  GetInactiveUserPayload,
  GetRetentionRatePayload,
} from "@/types/analytics/track-growth.payload.dto";
import {
  getActiveUsersCount,
  getInactiveUsersCount,
  getMonthlyUserGrowth,
  getNewUsersCount,
  getUserRetentionRate,
} from "@/apis/track-growth.api";
import { useQuery } from "@tanstack/react-query";
import { getTotalUserCount } from "@/apis/track-growth.api";
import { CountNewUserPayload } from "@/types/analytics/track-growth.payload.dto";

/**
 * Query hook to get the total user count.
 */
export function useTotalUserCount() {
  return useQuery({
    queryKey: ["track-growth", "total-user-count"],
    queryFn: getTotalUserCount,
    select: (data) => data.data,
  });
}

/**
 * Query hook to get the count of new users.
 * @param params - The parameters for counting new users.
 */

export function useNewUsersCount(params: CountNewUserPayload) {
  return useQuery({
    queryKey: ["track-growth", "new-user-count", params],
    queryFn: () => getNewUsersCount(params),
    select: (data) => data.data,
    enabled: !!params,
  });
}

/**
 * Query hook to get the count of active users.
 * @param params - The parameters for counting active users.
 */
export function useActiveUsersCount(params: GetActiveUserPayload) {
  return useQuery({
    queryKey: ["track-growth", "active-user-count", params],
    queryFn: () => getActiveUsersCount(params),
    select: (data) => data.data,
    enabled: !!params,
  });
}

/**
 * Query hook to get the count of inactive users.
 * @param params - The parameters for counting inactive users.
 */
export function useInactiveUsersCount(params: GetInactiveUserPayload) {
  return useQuery({
    queryKey: ["track-growth", "inactive-user-count", params],
    queryFn: () => getInactiveUsersCount(params),
    select: (data) => data.data,
    enabled: !!params,
  });
}

/**
 * Query hook to get the user retention rate.
 * @param params - The parameters for getting retention rate.
 */
export function useUserRetentionRate(params: GetRetentionRatePayload) {
  return useQuery({
    queryKey: ["track-growth", "user-retention-rate", params],
    queryFn: () => getUserRetentionRate(params),
    select: (data) => data.data,
    enabled: !!params,
  });
}

/**
 * Query hook to get monthly user growth.
 */
export function useMonthlyUserGrowth() {
  return useQuery({
    queryKey: ["track-growth", "monthly-user-growth"],
    queryFn: getMonthlyUserGrowth,
    select: (data) => data.data,
  });
}
