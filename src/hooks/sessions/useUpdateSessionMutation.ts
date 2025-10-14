import { useMutation } from "@tanstack/react-query";

import { updateSession } from "@/apis/session.api";
import { invalidateQueries } from "@/lib/query-client";
import type { SessionDto } from "@/types/session/session.dto";
import type { UpdateSessionDto } from "@/types/session/update-session.api.dto";

interface UpdateSessionPayload {
  sessionId: string;
  updateData: UpdateSessionDto;
}

export function useUpdateSessionMutation() {
  return useMutation({
    mutationFn: ({ sessionId, updateData }: UpdateSessionPayload) =>
      updateSession(sessionId, updateData),
    onSuccess: (data: SessionDto, variables: UpdateSessionPayload) => {
      // Invalidate sessions list and specific session detail
      invalidateQueries.ld();

      // Show success toast
      // toast.success("Session updated successfully");
    },
    onError: (error) => {
      console.error("Failed to update session:", error);
      // Error toast is handled by global mutation error handler
    },
  });
}
