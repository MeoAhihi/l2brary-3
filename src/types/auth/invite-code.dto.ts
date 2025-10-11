/**
 * DTO for accepting/responding an invite code and email.
 */
export type InviteCodeDto = {
  code: string;
  email?: string;
};

export type InviteCodeQuery = {
  email?: string;
};
