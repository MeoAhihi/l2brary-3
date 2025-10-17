import {
  getPermissions,
  getRoleById,
  getRoles,
} from "@/apis/authorization.api";
import { GetOneRoleResponse } from "@/types/authorization/get-one.api.dto";
import { PermissionDto } from "@/types/authorization/permission.dto";
import { RefRoleDto } from "@/types/authorization/ref-role.dto";
import { UpdateRoleResponse } from "@/types/authorization/update.api.dto";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Fetch all permissions
export function usePermissionsQuery(options: any = {}) {
  return useQuery<PermissionDto[]>({
    queryKey: ["permissions"],
    queryFn: getPermissions,
    ...options,
  });
}

// Fetch all roles
export function useGetAllRolesQuery(options: any = {}) {
  return useQuery<RefRoleDto[]>({
    queryKey: ["roles"],
    queryFn: getRoles,
    ...options,
  });
}

// Fetch a role by id
export function useGetOneRoleQuery(roleId: string, options: any = {}) {
  return useQuery<GetOneRoleResponse>({
    queryKey: ["role", roleId],
    queryFn: getRoleById,
    enabled: !!roleId,
    ...options,
  });
}
