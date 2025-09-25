"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";

import { ACCESS_TOKEN } from "@/constants/authentication";
import { Member, Role } from "@/types/iam.types";

import { AuthAction, AuthState, User } from "./types";
import {
  getUserDisplayName,
  getUserInitials,
  hasRequiredRole,
  isProfileComplete,
  isValidEmail,
  isValidPhoneNumber,
  validatePermissions,
} from "./utils";

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  permissions: [],
  token: null,
};

// Reducer
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "AUTH_START":
      return {
        ...state,
        isLoading: true,
      };
    case "AUTH_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        permissions: action.payload.permissions,
        isAuthenticated: true,
        isLoading: false,
      };
    case "AUTH_FAILURE":
      return {
        ...state,
        user: null,
        token: null,
        permissions: [],
        isAuthenticated: false,
        isLoading: false,
      };
    case "LOGOUT":
      return {
        ...initialState,
        isLoading: false,
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };
    case "SET_PERMISSIONS":
      return {
        ...state,
        permissions: action.payload,
      };
    default:
      return state;
  }
}

// Context
interface AuthContextType extends AuthState {
  login: (user: User, token: string, permissions: string[]) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  setPermissions: (permissions: string[]) => void;
  hasPermission: (permission: string) => boolean;
  hasAnyPermission: (permissions: string[]) => boolean;
  hasAllPermissions: (permissions: string[]) => boolean;
  // Utility functions
  validatePermissions: (permissions: string[]) => boolean;
  hasRequiredRole: (requiredRoles: string[]) => boolean;
  getUserDisplayName: () => string;
  isProfileComplete: () => boolean;
  getUserInitials: () => string;
  isValidEmail: (email: string) => boolean;
  isValidPhoneNumber: (phone: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing token on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (token) {
        try {
          // Here you would typically validate the token with your API
          // For now, we'll just set loading to false
          dispatch({ type: "AUTH_START" });

          // TODO: Implement token validation with your authentication API
          // const response = await validateToken(token);
          // if (response.isValid) {
          //   dispatch({ type: 'AUTH_SUCCESS', payload: response.data });
          // } else {
          //   dispatch({ type: 'AUTH_FAILURE' });
          // }

          // Temporary: just set loading to false
          setTimeout(() => {
            dispatch({ type: "AUTH_FAILURE" });
          }, 100);
        } catch (error) {
          dispatch({ type: "AUTH_FAILURE" });
        }
      } else {
        dispatch({ type: "AUTH_FAILURE" });
      }
    };

    checkAuthStatus();
  }, []);

  const login = (user: User, token: string, permissions: string[]) => {
    localStorage.setItem(ACCESS_TOKEN, token);
    dispatch({ type: "AUTH_SUCCESS", payload: { user, token, permissions } });
  };

  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    dispatch({ type: "LOGOUT" });
  };

  const updateUser = (userData: Partial<User>) => {
    dispatch({ type: "UPDATE_USER", payload: userData });
  };

  const setPermissions = (permissions: string[]) => {
    dispatch({ type: "SET_PERMISSIONS", payload: permissions });
  };

  const hasPermission = (permission: string): boolean => {
    return state.permissions.includes(permission);
  };

  const hasAnyPermission = (permissions: string[]): boolean => {
    return permissions.some((permission) =>
      state.permissions.includes(permission),
    );
  };

  const hasAllPermissions = (permissions: string[]): boolean => {
    return permissions.every((permission) =>
      state.permissions.includes(permission),
    );
  };

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    updateUser,
    setPermissions,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    // Utility functions
    validatePermissions: (permissions: string[]) =>
      validatePermissions(permissions),
    hasRequiredRole: (requiredRoles: string[]) =>
      hasRequiredRole(state.user, requiredRoles),
    getUserDisplayName: () => getUserDisplayName(state.user),
    isProfileComplete: () => isProfileComplete(state.user),
    getUserInitials: () => getUserInitials(state.user),
    isValidEmail,
    isValidPhoneNumber,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Permission helpers
export const PERMISSIONS = {
  // Admin permissions
  ADMIN_READ: "admin:read",
  ADMIN_WRITE: "admin:write",
  ADMIN_DELETE: "admin:delete",

  // Member permissions
  MEMBER_READ: "member:read",
  MEMBER_WRITE: "member:write",

  // Course permissions
  COURSE_READ: "course:read",
  COURSE_WRITE: "course:write",
  COURSE_DELETE: "course:delete",

  // Session permissions
  SESSION_READ: "session:read",
  SESSION_WRITE: "session:write",
  SESSION_DELETE: "session:delete",

  // Analytics permissions
  ANALYTICS_READ: "analytics:read",
  ANALYTICS_WRITE: "analytics:write",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
