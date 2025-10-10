"use client";

import { useQuery } from "@tanstack/react-query";

import { getUserById } from "@/apis/user.api";
import { queryKeys } from "@/constants/query-keys";

/**
 * Hook to get a single user by ID
 * @param id - User ID
 * @returns React Query result with user data
 */
export const useGetUserById = (id: string) => {
  return useQuery({
    queryKey: [queryKeys.iam.users, "detail", id],
    queryFn: () => getUserById(id),
    enabled: !!id, // Only run the query if id is available
    refetchOnWindowFocus: false,
  });
};
