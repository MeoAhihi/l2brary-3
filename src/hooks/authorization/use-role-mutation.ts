import {
  AttachPermissionPayload,
  AttachPermissionResponse,
} from "@/types/authorization/attach-permission.api.dto";
import {
  UpdateRoleByIdPayload,
  UpdateRoleResponse,
} from "@/types/authorization/update.api.dto";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";

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
      const res = await axios.post<AttachPermissionResponse>(
        `/api/admin/roles/${roleId}/attach-permissions`,
        data,
      );
      return res.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["role", variables.roleId] });
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
}
