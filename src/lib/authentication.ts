import { cookies } from "next/headers";
import { ACCESS_TOKEN } from "@/constants/authentication";

export const decrypt = async (cookie: string | undefined) => {
  if (!cookie) {
    return null;
  }
  return JSON.parse(
    Buffer.from(cookie.split(".")[1], "base64").toString("ascii")
  );
};

export const checkTokenExpired = (token: { exp: number }) => {
  if (!token) {
    return true;
  }
  const currentTime = new Date().getTime() / 1000;
  return currentTime > token.exp;
};

export const setAccessTokenCookie = async (token: string) => {
  const cookieStore = await cookies();
  cookieStore.set(ACCESS_TOKEN, token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24, // 1 day
    path: "/",
  });
};

export const removeAccessTokenCookie = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_TOKEN);
};

export const getAccessTokenCookie = async () => {
  const cookieStore = await cookies();
  return cookieStore.get(ACCESS_TOKEN)?.value ?? null;
};

export const login = async (email: string, password: string) => {
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

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();

  // Set the access token cookie
  await setAccessTokenCookie(data.access_token);

  return data;
};
