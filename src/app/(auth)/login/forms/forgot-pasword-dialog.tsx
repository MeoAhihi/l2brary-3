"use client";

import { SendHorizonal, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useForgotPassword } from "@/hooks/auth/use-forgot-password";

export default function ForgotPasswordDialog() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const forgotPassword = useForgotPassword();
  return (
    <Dialog>
      <DialogTrigger>Quên mật khẩu?</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Quên mật khẩu?</DialogTitle>
          <DialogDescription>
            Nếu bạn quên mật khẩu, vui lòng nhập email vào ô bên dưới để chuyển
            đến trang đặt lại mật khẩu.
            <Input
              className="text-primary my-3"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">
                <X />
                Hủy bỏ
              </Button>
            </DialogClose>
            <Button
              onClick={() =>
                forgotPassword.mutate(email, {
                  onSuccess: () => router.push("/forgot-password"),
                })
              }
              disabled={forgotPassword.isPending}
            >
              {forgotPassword.isPending && <Spinner />}
              <SendHorizonal />
              Gửi email
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
