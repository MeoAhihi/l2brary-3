import { SignupForm } from "@/components/auth/signup-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signup } from "./action";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | L2brary",
  description: "Create your L2brary account with invite",
};

interface RegisterPageProps {
  params: {
    invite_token: string;
  };
}

export default function RegisterPage({ params }: RegisterPageProps) {
  const { invite_token } = params;

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
        <div className="mb-4 p-3 bg-muted rounded-lg">
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
