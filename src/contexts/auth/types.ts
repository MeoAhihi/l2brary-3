import { IAMProfileResponse } from "@/types/auth/iam.response";

export interface AuthState {
  user: IAMProfileResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export type AuthAction =
  | { type: "AUTH_START" }
  | {
      type: "AUTH_SUCCESS";
      payload: {
        user: IAMProfileResponse;
      };
    }
  | { type: "AUTH_FAILURE" }
  | { type: "LOGOUT" }
  | { type: "UPDATE_USER"; payload: Partial<IAMProfileResponse> }
  | { type: "SET_PERMISSIONS"; payload: string[] };

export type Permission = string;
