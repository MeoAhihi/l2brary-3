/**
 * Payload for unassigning a role from a user.
 */
export type UnassignRolePayload = {
  /**
   * The unique identifier of the user to unassign the role from.
   * Example: "123e4567-e89b-12d3-a456-426614174000"
   */
  id: string;
  /**
   * The unique identifier of the role to unassign.
   * Example: "role-123e4567-e89b-12d3-a456-426614174000"
   */
  roleId: string;
};
