import { z } from "zod";

import { PHONE_NUMBER_REGEX } from "@/lib/regex";

export const userFormSchema = z.object({
  phoneNumber: z
    .string()
    .trim()
    .min(1, { message: "Số điện thoại là bắt buộc" })
    .regex(PHONE_NUMBER_REGEX, {
      message: "Số điện thoại không được chứa khoảng trắng hoặc ký tự đặc biệt",
    }),
  password: z.string().trim().min(1, { message: "Mật khẩu là bắt buộc" }),
});
