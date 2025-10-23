import axiosClient from "@/connectors/AxiosRestConnector";
import { IAMProfileResponse } from "@/types/auth/iam.response";
import { LoginPayload } from "@/types/auth/login.payload";
import { LoginResponse } from "@/types/auth/login.response";
import { RegisterPayload } from "@/types/auth/register.api.dto";

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
  email?: string,
): Promise<{
  message: string;
  inviteCode: { code: string; email: string };
}> => {
  const { data } = await axiosClient.post<{
    message: string;
    inviteCode: { code: string; email: string };
  }>("/authentication/invite", "{}", {
    params: { email },
  });

  return data;
};

export async function registerUser({ inviteCode, data }: RegisterPayload) {
  // Replace with your API endpoint

  const response = await axiosClient.post(
    "/authentication/register/" + inviteCode,
    data,
  );
  return response.data;
}

/**
 * Call API to request a password reset for the given email
 * @param email Email address to request password reset
 * @returns API response or throws error if request fails
 */
export const requestPasswordReset = async (
  email: string,
): Promise<{ message: string }> => {
  const { data } = await axiosClient.post<{ message: string }>(
    `/authentication/forgot-password`,
    {},
    { params: { email } },
  );
  return data;
};

/**
 * Call API to reset password using resetPasswordCode
 * @param resetPasswordCode OTP code received by user (path param)
 * @param newPassword The new password to set
 * @returns API response or throws error if reset fails
 */
export const resetPassword = async ({
  resetPasswordCode,
  newPassword,
}: {
  resetPasswordCode: string;
  newPassword: string;
}): Promise<{ message: string }> => {
  const { data } = await axiosClient.post<{ message: string }>(
    `/authentication/reset-password/${encodeURIComponent(resetPasswordCode)}`,
    { newPassword },
  );
  return data;
};

/**
 * Call API to change the user's password
 * @param currentPassword The user's current password
 * @param newPassword The new password to set
 * @returns API response or throws error if change fails
 */
export const changePassword = async ({
  currentPassword,
  newPassword,
}: {
  currentPassword: string;
  newPassword: string;
}): Promise<{ message: string }> => {
  const { data } = await axiosClient.post<{ message: string }>(
    "/authentication/change-password",
    {
      currentPassword,
      newPassword,
    },
  );
  return data;
};
