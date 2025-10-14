import { PermissionDto } from "./permission.dto";
import { RefRoleDto } from "./ref-role.dto";

export type AttachPermissionRequest = {
  /**
   * List of permission IDs to attach
   */
  permissionIds: string[];
};
/**
 * Payload for attaching permissions to a role.
 */
export type AttachPermissionPayload = {
  /**
   * Unique identifier for the role
   */
  roleId: string;

  /**
   * Data containing the list of permission IDs to attach to the role.
   */
  data: AttachPermissionRequest;
};

/**
 * Response type for attaching permissions to a role (res = get one).
 * Returns the updated role with its permissions.
 */
export type AttachPermissionResponse = RefRoleDto & {
  /**
   * List of permissions assigned to the role
   */
  permissions: PermissionDto[];
};
