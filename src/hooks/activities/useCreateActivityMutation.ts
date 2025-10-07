import { useMutation } from "@tanstack/react-query";

import { createActivity } from "@/apis/activity.api";
import { invalidateQueries } from "@/lib/query-client";
import type { ActivityCreatePayload } from "@/types/activities/activity";

export function useCreateActivityMutation() {
  return useMutation({
    mutationFn: (payload: ActivityCreatePayload) => createActivity(payload),
    onSuccess: () => {
      // refresh activities list
      invalidateQueries.ld();
    },
    onSettled: () => {
      // ensure activities specifically are refreshed
      invalidateQueries.ld();
    },
  });
}
