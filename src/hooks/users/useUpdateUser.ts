"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { adminModifyUserProfile } from "@/apis/user.api";
import { invalidateQueries } from "@/lib/query-client";
import type { UpdateUserDto } from "@/types/user/update-user.api.dto";

interface UseUpdateUserOptions {
  onSuccess?: () => void;
}

/**
 * Hook to update a user profile
 * @param options - Callback options
 * @returns Mutation object with updateUser function
 */
export const useUpdateUser = (options?: UseUpdateUserOptions) => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserDto }) =>
      adminModifyUserProfile(id, data),
    onSuccess: () => {
      // Invalidate users queries to refetch data
      invalidateQueries.iam();
      toast.success("Cập nhật thông tin người dùng thành công!");
      options?.onSuccess?.();
    },
    onError: (error: Error) => {
      toast.error(`Cập nhật thất bại: ${error.message}`);
    },
  });
};
