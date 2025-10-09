import { RefRoleDto } from "../authorization/ref-role.dto";
import { UsersItem } from "./get-all.api.dto";

/**
 * Payload for getting a single user by ID.
 */
export type GetOneUserPayload = {
  /**
   * The unique identifier of the user.
   * Example: "123e4567-e89b-12d3-a456-426614174000"
   */
  id: string;
};

export type GetOneUserResponse = UsersItem & {
  roles: RefRoleDto[];
};