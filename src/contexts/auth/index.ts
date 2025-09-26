// Auth module exports

export { AuthProvider, useAuth } from "./AuthContext";
export type { AuthAction, AuthState, Permission } from "./types";
export {
  getUserDisplayName,
  getUserInitials,
  hasRequiredRole,
  isProfileComplete,
  isValidEmail,
  isValidPhoneNumber,
  validatePermissions,
} from "./utils";
