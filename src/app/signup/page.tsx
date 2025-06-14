import { SignupForm } from "@/components/signup-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { signup } from "./action";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
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
  )
}
