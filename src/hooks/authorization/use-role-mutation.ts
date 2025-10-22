import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

import {
  attachPermissionsToRole,
  detachPermissionsFromRole,
} from "@/apis/authorization.api";
import { AttachPermissionPayload } from "@/types/authorization/attach-permission.api.dto";
import {
  UpdateRoleByIdPayload,
  UpdateRoleResponse,
} from "@/types/authorization/update.api.dto";

// Update a role's info by id
export function useUpdateRoleMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: UpdateRoleByIdPayload) => {
      const { id, data } = payload;
      const res = await axios.patch<UpdateRoleResponse>(
        `/api/admin/roles/${id}`,
        data,
      );
      return res.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["role", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
}

// Attach permissions to a role
export function useAttachPermissionsMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: AttachPermissionPayload) => {
      const { roleId, data } = payload;
      const res = await attachPermissionsToRole(roleId, data.permissionIds);
      return res.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["role", variables.roleId] });
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
      toast.success(`Gán quyền hạn vào vai trò ${data.name} thành công`);
    },
  });
}

// Detach permissions from a role
export function useDetachPermissionsMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: AttachPermissionPayload) => {
      const { roleId, data } = payload;
      // Use the API helper for detaching permissions (standardize with useAttachPermissionsMutation)
      const res = await detachPermissionsFromRole(roleId, data.permissionIds);
      return res.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["role", variables.roleId] });
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
      toast.success(`Gỡ quyền hạn khỏi vai trò ${data.name} thành công`);
    },
  });
}
