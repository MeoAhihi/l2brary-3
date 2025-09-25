// Auth module types

export interface User {
  id: string;
  fullname: string;
  international_name: string;
  birthday: string;
  role: "admin" | "member" | "monitor";
  is_male: boolean;
  group: string;
  school_class: string;
  phone_number: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  permissions: string[];
  token: string | null;
}

export type AuthAction =
  | { type: "AUTH_START" }
  | {
      type: "AUTH_SUCCESS";
      payload: { user: User; token: string; permissions: string[] };
    }
  | { type: "AUTH_FAILURE" }
  | { type: "LOGOUT" }
  | { type: "UPDATE_USER"; payload: Partial<User> }
  | { type: "SET_PERMISSIONS"; payload: string[] };

export type Permission = string;
