import { RefRoleDto } from "./ref-role.dto";
import { PermissionDto } from "./permission.dto";

/**
 * Payload for getting one role by id.
 */
export type GetOneRolePayload = {
  /**
   * Unique identifier for the role
   */
  id: string;
};

/**
 * Response type for getting one role with its permissions.
 */
export type GetOneRoleResponse = RefRoleDto & {
  /**
   * List of permissions assigned to the role
   */
  permissions: PermissionDto[];
};
