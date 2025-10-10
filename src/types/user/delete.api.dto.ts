/**
 * Payload for deleting a user by ID.
 */
export type DeleteUserPayload = {
  /**
   * The unique identifier of the user to delete.
   * Example: "123e4567-e89b-12d3-a456-426614174000"
   */
  id: string;
};
