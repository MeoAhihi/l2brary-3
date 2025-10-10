/**
 * Payload for assigning a role to a user.
 */
export type AssignRolePayload = {
  /**
   * The unique identifier of the user to assign the role to.
   * Example: "123e4567-e89b-12d3-a456-426614174000"
   */
  id: string;
  /**
   * The unique identifier of the role to assign.
   * Example: "role-123e4567-e89b-12d3-a456-426614174000"
   */
  roleId: string;
};
