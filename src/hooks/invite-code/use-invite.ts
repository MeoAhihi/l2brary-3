import { useMutation } from "@tanstack/react-query";
import { inviteUser } from "@/apis/authentication.api";

/**
 * React Query mutation hook for inviting a user.
 * @returns mutation object with mutate, status, etc.
 */
export function useInviteUser() {
  return useMutation({
    mutationFn: (email: string) => inviteUser(email),
  });
}
