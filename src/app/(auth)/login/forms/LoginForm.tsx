"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

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
import { PAGE_LINKS } from "@/constants/common";
import { PAGE_NAME } from "@/types/common";

import { useLogin } from "../hooks/useLogin";

const LoginForm = () => {
  const { form, login, status, error } = useLogin();

  const { control, handleSubmit } = form;

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(login)}
        className="mx-auto max-w-3xl space-y-8"
      >
        <FormField
          control={control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số điện thoại</FormLabel>
              <FormControl>
                <Input placeholder="VD: 0987654321" type="tel" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
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

        {error && (
          <div className="text-center text-sm text-red-500">{error}</div>
        )}
        <div className="flex flex-col gap-3">
          <Button
            type="submit"
            className="w-full"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          👋 Sau khi nhận{" "}
          <span
            className="cursor-help underline decoration-dotted"
            title="Mã mời là mã đăng ký nhận qua email sau khi phỏng vấn. Nếu chưa có, hãy liên hệ CLB nhé."
          >
            mã mời
          </span>
          , hãy nhấn{" "}
          <Link
            href={`/${PAGE_LINKS[PAGE_NAME.SIGN_UP]}`}
            className="underline underline-offset-4"
          >
            vào đây
          </Link>{" "}
          nhé
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
