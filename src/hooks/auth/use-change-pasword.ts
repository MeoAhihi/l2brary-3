import { useMutation } from "@tanstack/react-query";
import { changePassword } from "@/apis/authentication.api";
import { toast } from "sonner";

/**
 * Custom hook to change user's password using React Query's useMutation.
 * Usage:
 *   const mutation = useChangePassword();
 *   mutation.mutate({ currentPassword, newPassword });
 */
export function useChangePassword() {
  return useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success("Đổi mật khẩu thành công");
    },
    onError: (error) => {
      toast.error("Đổi mật khẩu thất bại", {
        description: error.message,
      });
    },
  });
}
