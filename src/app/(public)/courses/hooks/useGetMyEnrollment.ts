import { useQuery } from "@tanstack/react-query";

import { getMyEnrollment } from "@/apis/enrollment.api";
import { queryKeys } from "@/constants/query-keys";
import { GetMyEnrollmentPayload } from "@/types/enrollment/payload";
import { EnrollmentItem } from "@/types/enrollment/response";

interface UseGetMyEnrollmentOptions {
  params: GetMyEnrollmentPayload;
  enabled?: boolean;
}

interface UseGetMyEnrollmentResponse {
  enrollment: EnrollmentItem | null;
  message?: string;
}

export const useGetMyEnrollment = ({
  params,
  enabled = true,
}: UseGetMyEnrollmentOptions) => {
  return useQuery<UseGetMyEnrollmentResponse>({
    queryKey: [...queryKeys.ld.myEnrollments, params.courseId],
    queryFn: () => getMyEnrollment(params),
    // enabled,
  });
};
