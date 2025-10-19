// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axiosClient from "@/connectors/AxiosRestConnector";
import { AttachPermissionResponse } from "@/types/authorization/attach-permission.api.dto";
import {
  CreateRolePayload,
  CreateRoleResponse,
} from "@/types/authorization/create.api.dto";
import { GetOneRoleResponse } from "@/types/authorization/get-one.api.dto";
import { PermissionDto } from "@/types/authorization/permission.dto";
import { RefRoleDto } from "@/types/authorization/ref-role.dto";
import {
  UpdateRoleByIdPayload,
  UpdateRolePayload,
  UpdateRoleResponse,
} from "@/types/authorization/update.api.dto";

// Get all permissions
export const getPermissions = async (
  params: { attachRoles?: boolean } = {},
) => {
  const response = await axiosClient.get<PermissionDto[]>(
    "/authorization/permissions",
    { params },
  );
  return response.data;
};

// Get all roles
export const getRoles = async (params: { permissions?: boolean } = {}) => {
  const response = await axiosClient.get<RefRoleDto[]>("/authorization/roles", {
    params,
  });
  return response.data;
};

// Create role
export const createRole = async (roleData: CreateRolePayload) => {
  const response = await axiosClient.post<CreateRoleResponse>(
    "/authorization/roles",
    roleData,
  );
  return response.data;
};

// Get role by ID
export const getRoleById = async (id: string) => {
  const response = await axiosClient.get<GetOneRoleResponse>(
    `/authorization/roles/${id}`,
  );
  return response.data;
};

// Update role
export const updateRole = async (id: string, updateData: UpdateRolePayload) => {
  const response = await axiosClient.patch<UpdateRoleResponse>(
    `/authorization/roles/${id}`,
    updateData,
  );
  return response.data;
};

// Delete role
export const deleteRole = async (id: string) => {
  const response = await axiosClient.delete(`/authorization/roles/${id}`);
  return response;
};

// Attach permissions to role
export const attachPermissionsToRole = async (
  roleId: string,
  permissions: string[],
) => {
  const response = await axiosClient.post<AttachPermissionResponse>(
    `/authorization/roles/${roleId}/permissions/attach`,
    { permissionIds: permissions },
  );
  return response;
};

// Detach permissions from role
export const detachPermissionsFromRole = async (
  roleId: string,
  permissions: string[],
) => {
  const response = await axiosClient.post<AttachPermissionResponse>(
    `/authorization/roles/${roleId}/permissions/detach`,
    { permissionIds: permissions },
  );
  return response;
};
