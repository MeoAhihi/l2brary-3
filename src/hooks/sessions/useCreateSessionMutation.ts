import { useMutation } from "@tanstack/react-query";

import { createSession } from "@/apis/session.api";
import { invalidateQueries } from "@/lib/query-client";
import type { CreateSessionDto } from "@/types/session/create-session.api.dto";
import type { SessionDto } from "@/types/session/session.dto";

interface CreateSessionPayload {
  courseId: string;
  sessionData: CreateSessionDto;
}

export function useCreateSessionMutation(options?: {
  onSuccess?: (data: SessionDto, variables: CreateSessionPayload) => void;
}) {
  return useMutation({
    mutationFn: ({ courseId, sessionData }: CreateSessionPayload) =>
      createSession(courseId, sessionData),
    onSuccess: (data: SessionDto, variables: CreateSessionPayload) => {
      // Invalidate sessions list for the specific course
      invalidateQueries.ld();

      // Show success toast
      // toast.success("Session created successfully");

      if (options?.onSuccess) {
        options.onSuccess(data, variables);
      }
    },
    onError: (error) => {
      console.error("Failed to create session:", error);
      // Error toast is handled by global mutation error handler
    },
  });
}
