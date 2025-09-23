import { SignupForm } from "@/components/auth/signup-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Metadata } from "next";
import React from "react";
import { signup } from "./action";

export const metadata: Metadata = {
  title: "Register | L2brary",
  description: "Create your L2brary account with invite",
};

interface RegisterPageProps {
  params: Promise<{
    invite_token: string;
  }>;
}

export default function RegisterPage({ params }: RegisterPageProps) {
  const { invite_token } = React.use(params);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <div className="bg-muted mb-4 rounded-lg p-3">
            <p className="text-sm">
              <strong>Invite Token:</strong> {invite_token}
            </p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Bạn chưa có tài khoản?</CardTitle>
              <CardDescription>
                Nhập thông tin của bạn để đăng ký.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SignupForm signupAction={signup} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
