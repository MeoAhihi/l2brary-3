"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  "use server";
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  // Validate inputs
  if (!email || !password) {
    console.error({
      error: "Username and password are required",
    });
  }

  // Here you would typically:
  // 1. Verify credentials against your database
  // 2. Generate session/token
  // 3. Set cookies/session

  const response = await fetch(`${process.env.L2BRARY_DOMAIN}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await response.json();

  const cookieStore = await cookies();
  cookieStore.set("token", data.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  redirect("/dashboard");
}
