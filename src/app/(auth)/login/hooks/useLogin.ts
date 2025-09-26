"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { useAuth } from "@/contexts";
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";

import { resolveRedirectPath } from "../../shared/utils";
import { userFormSchema } from "../schemas/loginSchema";

type FormSchema = z.infer<typeof userFormSchema>;

interface UseLoginResult {
  form: ReturnType<typeof useForm<FormSchema>>;
  login: SubmitHandler<FormSchema>;
  status: string;
  error: string | null;
  isLoading: boolean;
}

export const useLogin = (): UseLoginResult => {
  const { login, updateUser, isAuthenticated } = useAuth();

  const { refetch: refetchCurrentUser } = useGetCurrentUser();
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const form = useForm<FormSchema>({
    resolver: zodResolver(userFormSchema),
    mode: "onChange",
    defaultValues: {
      phoneNumber: "",
      password: "",
    },
  });

  const handleLogin = useCallback<SubmitHandler<FormSchema>>(
    async (values) => {
      setLoading(true);
      try {
        await login(values);
        const { data: profile } = await refetchCurrentUser();
        if (profile) {
          updateUser(profile);
          const redirectPath = resolveRedirectPath(profile.roles);

          toast.success("Đăng nhập thành công");

          router.replace(redirectPath);
        } else {
          throw new Error("Không lấy được thông tin người dùng");
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Đăng nhập thất bại";
        toast.error(errorMessage);
        throw err; // Re-throw to let the form handle the error
      } finally {
        setLoading(false);
      }
    },
    [login, router, updateUser, refetchCurrentUser],
  );

  const getStatus = () => {
    if (loading) return "loading";
    if (isAuthenticated) return "success";
    return "idle";
  };

  return {
    form,
    login: handleLogin,
    status: getStatus(),
    error: null,
    isLoading: loading,
  };
};
