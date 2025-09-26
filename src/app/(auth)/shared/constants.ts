import { RoleEnum } from "@/types/auth/iam.response";

import { RoleRedirectConfig } from "./type";

export const ROLE_REDIRECT_PRIORITY: ReadonlyArray<RoleRedirectConfig> = [
  { role: RoleEnum.Admin, path: "/admin/members" },
  { role: RoleEnum.Monitor, path: "/log-activity" },
  { role: RoleEnum.Member, path: "/my-progress/performance" },
];

export const DEFAULT_AUTH_ROUTE = "/profile";
