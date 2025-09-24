// Auth module exports

export { AuthProvider, PERMISSIONS, useAuth } from "./AuthContext";
export type { AuthAction, AuthState, Permission, User } from "./types";
export {
  getUserDisplayName,
  getUserInitials,
  hasRequiredRole,
  isProfileComplete,
  isValidEmail,
  isValidPhoneNumber,
  validatePermissions,
} from "./utils";
