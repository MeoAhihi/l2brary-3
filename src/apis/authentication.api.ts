import axiosClient from "@/connectors/AxiosRestConnector";
import { IAMProfileResponse } from "@/types/auth/iam.response";
import { LoginPayload } from "@/types/auth/login.payload";
import { LoginResponse } from "@/types/auth/login.response";

/**
 * Call login API
 * @param payload Login information
 * @returns User information and token if successful
 * @throws Error if login fails
 */
export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const { data } = await axiosClient.post<LoginResponse>(
    "/authentication/login",
    payload,
  );

  return data;
};

/**
 * Call API to get current user
 * @returns User profile information
 * @throws Error if fetching user profile fails
 */
export const getCurrentUser = async (): Promise<IAMProfileResponse> => {
  const { data } = await axiosClient.get<IAMProfileResponse>("/user/profile");

  return data;
};

/**
 * Call API to invite a user by email
 * @param email Email address to invite
 * @returns Invitation result with message, email, and inviteCode
 * @throws Error if invitation fails
 */
export const inviteUser = async (
  email: string,
): Promise<{ message: string; email: string; inviteCode: string }> => {
  const { data } = await axiosClient.post<{
    message: string;
    email: string;
    inviteCode: string;
  }>("/authentication/invite", null, {
    params: { email },
  });

  return data;
};
