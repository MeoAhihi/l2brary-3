import { IAMProfileResponse, Role } from "@/types/auth/iam.response";

/**
 * Validate user permissions
 */
export const validatePermissions = (permissions: string[]): boolean => {
  return Array.isArray(permissions) && permissions.length > 0;
};

/**
 * Check if user has required role
 */
export const hasRequiredRole = (
  user: IAMProfileResponse | null,
  requiredRoles: Role[],
): boolean => {
  if (!user) return false;

  return requiredRoles.some((role) => user.roles.includes(role));
};

/**
 * Format user display name
 */
export const getUserDisplayName = (user: IAMProfileResponse | null): string => {
  if (!user) return "Unknown User";

  return user.fullName || user.internationalName || user.email;
};
