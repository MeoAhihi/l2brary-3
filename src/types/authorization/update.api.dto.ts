import { RefRoleDto } from "./ref-role.dto";
import { PermissionDto } from "./permission.dto";

/**
 * Payload for updating a role.
 */
export type UpdateRolePayload = {
  /**
   * Name of the role.
   */
  name?: string;
  /**
   * Description of the role.
   */
  description?: string;
};

/**
 * Payload for updating a role by id.
 */
export type UpdateRoleByIdPayload = {
  /**
   * Unique identifier for the role.
   */
  id: string;
  /**
   * Data to update for the role.
   */
  data: UpdateRolePayload;
};

/**
 * Response type for updating a role (res = get one).
 * Returns the updated role with its permissions.
 */
export type UpdateRoleResponse = RefRoleDto & {
  /**
   * List of permissions assigned to the role
   */
  permissions: PermissionDto[];
};
