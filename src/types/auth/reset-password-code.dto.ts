/**
 * DTO for accepting an invite code and email.
 */
export type ResetPasswordCodeDto = {
  code: string;
  email?: string;
};

export type resetPasswordDto = {
  newPassword: string;
};
