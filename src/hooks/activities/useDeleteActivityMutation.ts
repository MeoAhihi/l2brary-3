import { useMutation } from "@tanstack/react-query";

import { deleteActivity } from "@/apis/activity.api";
import { invalidateQueries } from "@/lib/query-client";

export function useDeleteActivityMutation() {
  return useMutation({
    mutationFn: (id: string | number) => deleteActivity(id),
    onSuccess: () => {
      invalidateQueries.ld();
    },
    onSettled: () => {
      invalidateQueries.ld();
    },
  });
}
