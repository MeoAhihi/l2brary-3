import { useMutation } from "@tanstack/react-query";
import { inviteUser } from "@/apis/authentication.api";

/**
 * React Query mutation hook for inviting a user.
 * @returns mutation object with mutate, status, etc.
 */
export function useInviteUser() {
  return useMutation({
    mutationFn: (email: string) => {
      return inviteUser(email);
    },
    onSuccess: (data) => {
      if (typeof window !== "undefined") {
        // dynamically import toast to avoid SSR issues
        import("sonner").then(({ toast }) => {
          toast(
            `Mã mời: ${data.inviteCode.code} đã gửi tới ${data.inviteCode.email}`,
            {
              duration: 60_000,
              action: {
                label: "Copy",
                onClick: () =>
                  navigator.clipboard.writeText(data.inviteCode.code),
              },
            },
          );
        });
      }
    },
  });
}
