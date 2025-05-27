'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export function LoginForm({ signupUrl = "/signup" }: { signupUrl?: string }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })

    if (response.ok) {
      const data = await response.json()
      localStorage.setItem("token", data.token)
      window.location.href = "/"
    } else {
      alert("Đăng nhập không thành công. Vui lòng thử lại.")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            onChange={handleEmailChange}
            id="email"
            type="email"
            placeholder="example@gmail.com"
            required
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Mật khẩu</Label>
            <a
              href="#"
              className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
            >
              Quên mật khẩu?
            </a>
          </div>
          <Input 
            id="password" 
            type="password" 
            onChange={handlePasswordChange}
            required 
          />
        </div>
        <div className="flex flex-col gap-3">
          <Button type="submit" className="w-full">
            Đăng nhập
          </Button>
          <Button variant="outline" className="w-full">
            <img src="/icons8-google.svg" alt="Google Icon" style={{ width: 20, height: "auto" }} />
            Đăng nhập với Google
          </Button>
        </div>
      </div>
      <div className="mt-4 text-center text-sm">
        Chưa có tài khoản?{" "}
        <a href={signupUrl} className="underline underline-offset-4">
          Đăng ký
        </a>
      </div>
    </form>
  )
}
