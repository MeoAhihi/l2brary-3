// Auth-specific utilities

import { User } from "./types";

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
  user: User | null,
  requiredRoles: string[],
): boolean => {
  if (!user) return false;
  return requiredRoles.includes(user.role);
};

/**
 * Format user display name
 */
export const getUserDisplayName = (user: User | null): string => {
  if (!user) return "Unknown User";
  return user.fullname || user.international_name || user.email;
};

/**
 * Check if user profile is complete
 */
export const isProfileComplete = (user: User | null): boolean => {
  if (!user) return false;
  return !!(user.fullname && user.email && user.phone_number && user.birthday);
};

/**
 * Get user initials for avatar
 */
export const getUserInitials = (user: User | null): string => {
  if (!user) return "U";

  const name = user.fullname || user.international_name;
  if (!name) return "U";

  const parts = name.split(" ");
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }

  return name.substring(0, 2).toUpperCase();
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number format (Vietnamese format)
 */
export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
  return phoneRegex.test(phone);
};
