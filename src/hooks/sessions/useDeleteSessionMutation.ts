import { useMutation } from "@tanstack/react-query";

import { deleteSession } from "@/apis/session.api";
import { invalidateQueries } from "@/lib/query-client";

interface DeleteSessionPayload {
  sessionId: string;
}

export function useDeleteSessionMutation() {
  return useMutation({
    mutationFn: ({ sessionId }: DeleteSessionPayload) =>
      deleteSession(sessionId),
    onSuccess: (data, variables: DeleteSessionPayload) => {
      // Invalidate sessions list
      invalidateQueries.ld();

      // Show success toast
      // toast.success("Session deleted successfully");
    },
    onError: (error) => {
      console.error("Failed to delete session:", error);
      // Error toast is handled by global mutation error handler
    },
  });
}
