import { useQuery } from "@tanstack/react-query";
import { getCourseSessions } from "@/apis/session.api";
import { GetAllSessionPayload } from "@/types/session/get-all-session.api.dto";

export function useSessionsQuery({
  apiParams,
}: {
  apiParams: GetAllSessionPayload;
}) {
  return useQuery({
    queryKey: ["sessions", apiParams],
    queryFn: () => getCourseSessions(apiParams),
  });
}
