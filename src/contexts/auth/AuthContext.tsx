"use client";

import { useMutation } from "@tanstack/react-query";
import { deleteCookie, setCookie } from "cookies-next";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";

import { login as loginApi } from "@/apis/authentication.api";
import { ACCESS_TOKEN } from "@/constants/authentication";
import { IS_DEVELOPMENT } from "@/constants/common";
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";
import { decodeJWT } from "@/lib/jwt";
import { invalidateQueries } from "@/lib/query-client";
import { IAMProfileResponse, Role } from "@/types/auth/iam.response";
import { LoginPayload } from "@/types/auth/login.payload";

import { authReducer, initialState } from "./reducer";
import { AuthState } from "./types";
import { getUserDisplayName, hasRequiredRole } from "./utils";

// Context
interface AuthContextType extends AuthState {
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<IAMProfileResponse>) => void;
  hasRequiredRole: (requiredRoles: Role[]) => boolean;
  getUserDisplayName: () => string;
  // React Query mutations
  loginMutation: ReturnType<typeof useMutation>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const { data: authData, isLoading: isValidatingToken } = useGetCurrentUser();

  // Update auth state when token validation completes
  useEffect(() => {
    if (isValidatingToken) {
      dispatch({ type: "AUTH_START" });
    } else if (authData) {
      dispatch({
        type: "AUTH_SUCCESS",
        payload: {
          user: authData,
        },
      });
    } else {
      dispatch({ type: "AUTH_FAILURE" });
    }
  }, [authData, isValidatingToken]);

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const response = await loginApi(payload);
      return response;
    },
    onSuccess: (data) => {
      // Store token in cookie
      const decodedData = decodeJWT(data.accessToken);
      const tokenLifespan =
        decodedData?.exp && decodedData?.iat
          ? decodedData.exp - decodedData.iat
          : undefined;

      // Update state
      setCookie(ACCESS_TOKEN, data.accessToken, {
        maxAge: tokenLifespan,
      });
    },
    onError: (error) => {
      dispatch({ type: "AUTH_FAILURE" });
      if (IS_DEVELOPMENT) console.error("Login error:", error);
    },
  });

  const login = async (payload: LoginPayload) => {
    await loginMutation.mutateAsync(payload);
  };

  const logout = () => {
    deleteCookie(ACCESS_TOKEN);
    dispatch({ type: "LOGOUT" });
    window.location.reload();
  };

  const updateUser = (userData: Partial<IAMProfileResponse>) => {
    dispatch({ type: "UPDATE_USER", payload: userData });
  };

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    updateUser,
    // Utility functions
    hasRequiredRole: (requiredRoles: Role[]) =>
      hasRequiredRole(state.user, requiredRoles),
    getUserDisplayName: () => getUserDisplayName(state.user),
    // React Query mutations
    loginMutation: loginMutation as any,
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
