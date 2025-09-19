"use server";
import { login as loginApi } from "@/lib/authentication";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  "use server";
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  redirect("/admin/members");
  const data = await loginApi(email, password);
  console.log("🚀 ~ login ~ data:", data);

}
