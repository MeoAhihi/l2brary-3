import { useMutation, useQueryClient } from "@tanstack/react-query";

import { logGamificationActivity } from "@/apis/activity.api";
import { queryKeys } from "@/constants/query-keys";
import type {
  ActivityLogType,
  LogActivityDto,
} from "@/types/activities/gamification";

export function useLogGamificationActivityMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: LogActivityDto) => logGamificationActivity(payload),
    onSuccess: (data: ActivityLogType) => {
      // Invalidate activity logs queries to refetch updated data
      queryClient.invalidateQueries({
        queryKey: queryKeys.ld.activityLogs,
      });

      // Invalidate user activity report if it exists for the user
      if (data.user?.id) {
        queryClient.invalidateQueries({
          queryKey: [...queryKeys.ld.userActivityReport, data.user.id],
        });
      }
    },
  });

  return {
    ...mutation,
    logActivity: mutation.mutate,
    logActivityAsync: mutation.mutateAsync,
  };
}
