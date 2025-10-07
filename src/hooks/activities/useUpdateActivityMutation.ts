import { useMutation } from "@tanstack/react-query";

import { updateActivity } from "@/apis/activity.api";
import { invalidateQueries } from "@/lib/query-client";
import type { ActivityUpdatePayload } from "@/types/activities/activity";

export function useUpdateActivityMutation() {
  return useMutation({
    mutationFn: (params: {
      id: string | number;
      payload: ActivityUpdatePayload;
    }) => updateActivity(params.id, params.payload),
    onSuccess: () => {
      invalidateQueries.ld();
    },
    onSettled: () => {
      invalidateQueries.ld();
    },
  });
}
