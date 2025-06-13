"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signup(formData: FormData) {
  "use server";
  const registerData = Object.fromEntries(formData);

  // Here you would typically:
  // 1. Verify credentials against your database
  // 2. Generate session/token
  // 3. Set cookies/session

  const response = await fetch(`${process.env.L2BRARY_DOMAIN}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerData),
  });
  const data = await response.json();

  const cookieStore = await cookies();
  cookieStore.set("token", data.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 , // 1 day
  });

  redirect("/dashboard");
}
