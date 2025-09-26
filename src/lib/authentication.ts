import { cookies } from "next/headers";

import { ACCESS_TOKEN } from "@/constants/authentication";

export const decrypt = async (cookie: string | undefined) => {
  if (!cookie) {
    return null;
  }
  return JSON.parse(
    Buffer.from(cookie.split(".")[1], "base64").toString("ascii"),
  );
};

export const checkTokenExpired = (exp: number) => {
  if (!exp) {
    return true;
  }
  const currentTime = new Date().getTime() / 1000;
  return currentTime > exp;
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
