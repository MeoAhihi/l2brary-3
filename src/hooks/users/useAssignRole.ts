"use client";

import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

import { assignRoleToUser } from "@/apis/user.api";
import { invalidateQueries } from "@/lib/query-client";
import { queryKeys } from "@/constants/query-keys";

interface UseAssignRoleOptions {
  onSuccess?: () => void;
}

/**
 * Hook to assign a role to a user
 * @param options - Callback options
 * @returns Mutation object with assignRole function
 */
export const useAssignRole = (options?: UseAssignRoleOptions) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, roleId }: { id: string; roleId: string }) =>
      assignRoleToUser(id, roleId),
    onSuccess: () => {
      // Invalidate users queries to refetch data
      queryClient.invalidateQueries({ queryKey: [queryKeys.iam.users] });
      toast.success("Gán vai trò cho người dùng thành công!");
      options?.onSuccess?.();
    },
    onError: (error: Error) => {
      toast.error(`Gán vai trò thất bại: ${error.message}`);
    },
  });
};
