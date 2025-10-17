"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { deleteUser } from "@/apis/user.api";
import { invalidateQueries } from "@/lib/query-client";

/**
 * Hook to delete a user
 * @param options - Callback options
 * @returns Mutation object with deleteUser function
 */
export const useDeleteUser = () => {
  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      // Invalidate users queries to refetch data
      invalidateQueries.iam();
      toast.success("Offboard người dùng thành công!");
    },
    onError: (error: Error) => {
      toast.error(`Offboard thất bại: ${error.message}`);
    },
  });
};
