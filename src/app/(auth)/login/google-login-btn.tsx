// components/GoogleLoginButton.tsx
"use client";
import { signIn } from "next-auth/react";

export default function GoogleLoginButton() {
  const handleLogin = () => {
    // Redirect directly to NestJS backend /auth/google
    window.location.href = "localhost:3000/auth/google";
  };

  return <button onClick={() => signIn("google")}>Sign in with Google</button>;
}
