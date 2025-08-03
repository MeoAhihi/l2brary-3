"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export function LoginForm({
  signupUrl = "/signup",
  loginAction,
}: {
  signupUrl?: string;
  loginAction: (formData: FormData) => Promise<void>;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);
    await loginAction(formData);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        // action={loginAction}
        className="space-y-8 max-w-3xl mx-auto"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="example@gmail.com"
                  type="email"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mật khẩu</FormLabel>
              <FormControl>
                <PasswordInput placeholder="●●●●●●●●" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-3">
          <Button type="submit" className="w-full">
            Đăng nhập
          </Button>
          <Button variant="outline" className="w-full">
            <Image
              src="/icons8-google.svg"
              alt="Google Icon"
              width={20}
              height={20}
            />
            Đăng nhập với Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Chưa có tài khoản?{" "}
          <a href={signupUrl} className="underline underline-offset-4">
            Đăng ký
          </a>
        </div>
      </form>
    </Form>
  );
}
