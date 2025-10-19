import { RefRoleDto } from "./ref-role.dto";

/**
 * Permission DTO
 */
export type PermissionDto = {
  /**
   * Unique identifier for the permission
   */
  id: string;
  /**
   * Name of the permission
   */
  name: string;

  roles?: RefRoleDto[];
};
