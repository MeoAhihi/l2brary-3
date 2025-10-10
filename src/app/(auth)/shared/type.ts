import { RoleEnum } from "@/types/auth/iam.response";

export interface RoleRedirectConfig {
  role: RoleEnum;
  path: string;
}
