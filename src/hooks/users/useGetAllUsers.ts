"use client";

import { useQuery } from "@tanstack/react-query";

import { getAllUsers } from "@/apis/user.api";
import { queryKeys } from "@/constants/query-keys";
import type { GetAllUsersPayload } from "@/types/user/get-all.api.dto";

/**
 * Hook to get all users with pagination and filtering
 * @param params - Query parameters (page, limit, filters)
 * @returns React Query result with users data
 */
export const useGetAllUsers = (params: GetAllUsersPayload = {}) => {
  return useQuery({
    queryKey: [queryKeys.iam.users, params],
    queryFn: () => getAllUsers(params),
    refetchOnWindowFocus: false,
  });
};
