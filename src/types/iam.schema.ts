import { z } from "zod";
import { Role } from "./iam.types";

export const MemberSchema = z.object({
  id: z.string(),
  fullname: z.string(),
  international_name: z.string(),
  birthday: z.string(),
  role: z.nativeEnum(Role),
  is_male: z.boolean(),
  group: z.string(),
  school_class: z.string(),
  phone_number: z.string(),
  email: z.string().email(),
});
