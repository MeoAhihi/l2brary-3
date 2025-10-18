"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { unassignRoleFromUser } from "@/apis/user.api";
import { invalidateQueries } from "@/lib/query-client";
import { queryKeys } from "@/constants/query-keys";

interface UseUnassignRoleOptions {
  onSuccess?: () => void;
}

/**
 * Hook to unassign a role from a user
 * @param options - Callback options
 * @returns Mutation object with unassignRole function
 */
export const useUnassignRole = (options?: UseUnassignRoleOptions) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, roleId }: { id: string; roleId: string }) =>
      unassignRoleFromUser(id, roleId),
    onSuccess: () => {
      // Invalidate users queries to refetch data
      queryClient.invalidateQueries({ queryKey: ["members"] });
      toast.success("Hủy gán vai trò cho người dùng thành công!");
      options?.onSuccess?.();
    },
    onError: (error: Error) => {
      toast.error(`Hủy gán vai trò thất bại: ${error.message}`);
    },
  });
};
