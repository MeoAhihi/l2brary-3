import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next/client";

import { getCurrentUser } from "@/apis/authentication.api";
import { ACCESS_TOKEN } from "@/constants/authentication";
import { queryKeys } from "@/constants/query-keys";
import { IAMProfileResponse } from "@/types/auth/iam.response";

export const useGetCurrentUser = () => {
  return useQuery<IAMProfileResponse>({
    queryKey: queryKeys.auth.session,
    queryFn: getCurrentUser,
    enabled: Boolean(getCookie(ACCESS_TOKEN)),
  });
};
