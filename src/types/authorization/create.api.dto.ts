import { RefRoleDto } from "./ref-role.dto";

/**
 * Payload for creating a new role.
 */
export type CreateRolePayload = {
  /**
   * Name of the role.
   * Example: "admin"
   */
  name: string;
  /**
   * Description of the role.
   * Example: "Administrator role with full permissions"
   */
  description?: string;
};

export type CreateRoleResponse = RefRoleDto;
