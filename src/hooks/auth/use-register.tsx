import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { registerUser } from "@/apis/authentication.api";
import { RegisterPayload } from "@/types/auth/register.api.dto";

export function useRegister() {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success("Đăng ký thành công");
    },
    onError: () => {
      toast.error("Đăng ký thất bại");
    },
  });
}
