"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { assignRoleToUser } from "@/apis/user.api";
import { invalidateQueries } from "@/lib/query-client";

interface UseAssignRoleOptions {
  onSuccess?: () => void;
}

/**
 * Hook to assign a role to a user
 * @param options - Callback options
 * @returns Mutation object with assignRole function
 */
export const useAssignRole = (options?: UseAssignRoleOptions) => {
  return useMutation({
    mutationFn: ({ id, roleId }: { id: string; roleId: string }) =>
      assignRoleToUser(id, roleId),
    onSuccess: () => {
      // Invalidate users queries to refetch data
      invalidateQueries.iam();
      toast.success("Gán vai trò cho người dùng thành công!");
      options?.onSuccess?.();
    },
    onError: (error: Error) => {
      toast.error(`Gán vai trò thất bại: ${error.message}`);
    },
  });
};
