import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { resetPassword } from "@/apis/authentication.api";

/**
 * useResetPassword provides a mutation for resetting password.
 * Usage:
 *   const mutation = useResetPassword();
 *   mutation.mutate({ resetPasswordCode, newPassword });
 */
export function useResetPassword() {
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success("Mật khẩu đã được đổi thành công.");
    },
    onError: () => {
      toast.error("Đổi mật khẩu thất bại. Vui lòng thử lại.");
    },
  });
}
