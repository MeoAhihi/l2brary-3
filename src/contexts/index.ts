// Export all contexts and their hooks from modules
export {
  defaultQueryClient,
  GlobalProvider,
} from "../providers/GlobalProvider";

// Export from auth module
export type { AuthAction, AuthState, Permission, User } from "./auth";
export { AuthProvider, PERMISSIONS, useAuth } from "./auth";

// Export from app module
export type {
  AppAction,
  AppState,
  Language,
  NotificationItem,
  Theme,
} from "./app";
export { AppProvider, useApp } from "./app";

// Export from data module
export type {
  AppSettings,
  DataAction,
  DataState,
  UserPreferences,
} from "./data";
export { DataProvider, useData } from "./data";

// Re-export commonly used types for convenience
export type { Member, Role } from "@/types/iam.types";
