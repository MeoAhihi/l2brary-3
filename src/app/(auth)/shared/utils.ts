import { Role } from "@/types/auth/iam.response";

import { DEFAULT_AUTH_ROUTE, ROLE_REDIRECT_PRIORITY } from "./constants";

/**
 * Prioritize the role with the highest function (according to ROLE_REDIRECT_PRIORITY order)
 * If the user has multiple roles, redirect according to the highest priority role
 */
export const resolveRedirectPath = (roles: Array<Role> | undefined): string => {
  if (!roles?.length) {
    return DEFAULT_AUTH_ROUTE;
  }

  // Find the first role in ROLE_REDIRECT_PRIORITY that the user has
  for (const { role, path } of ROLE_REDIRECT_PRIORITY) {
    if (roles.some((r) => r.name === role)) {
      return path;
    }
  }
  return DEFAULT_AUTH_ROUTE;
};
