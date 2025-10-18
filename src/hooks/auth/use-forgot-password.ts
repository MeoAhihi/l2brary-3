import { useMutation } from "@tanstack/react-query";
import { requestPasswordReset } from "@/apis/authentication.api";
import { toast } from "sonner";

/**
 * useForgotPassword provides a mutation to request a password reset email.
 *
 * Usage:
 *   const mutation = useForgotPassword();
 *   mutation.mutate(email);
 */
export function useForgotPassword() {
  return useMutation({
    mutationFn: requestPasswordReset,
    onSuccess: () => {
      toast.success("Email đặt lại mật khẩu đã được gửi.");
    },
    onError: () => {
      toast.error("Gửi email đặt lại mật khẩu thất bại.");
    },
  });
}
