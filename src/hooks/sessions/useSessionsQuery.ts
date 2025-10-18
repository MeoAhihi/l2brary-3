import { useQuery } from "@tanstack/react-query";

import { getCourseSessions } from "@/apis/session.api";
import {
  GetAllSessionPayload,
  GetAllSessionResponse,
} from "@/types/session/get-all-session.api.dto";

export function useSessionsQuery(params: GetAllSessionPayload) {
  const { courseId, ...queries } = params;
  return useQuery<GetAllSessionResponse>({
    queryKey: ["sessions", courseId, queries],
    queryFn: () => getCourseSessions(params),
  });
}
