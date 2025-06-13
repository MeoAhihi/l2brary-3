import { LoginForm } from "@/components/login-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { login } from "./action"
export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Đăng nhập</CardTitle>
              <CardDescription>
                Nhập thông tin đăng nhập của bạn để tiếp tục.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm loginAction={login} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
