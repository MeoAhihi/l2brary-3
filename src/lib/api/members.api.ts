"use server";
import { cookies } from "next/headers";

export async function getMembers() {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const response = await fetch(`${process.env.L2BRARY_DOMAIN}/members`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  return data;
}

export async function getMember(id: string) {
  const cookieStorage = await cookies();
  const token = cookieStorage.get("token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const response = await fetch(`${process.env.L2BRARY_DOMAIN}/members/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  return data;
}
