import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/query-keys";
import { getCourseGroups } from "@/apis/course.api";

export const useCourseGroupsQuery = () => {
  return useQuery({
    queryKey: [...queryKeys.ld.courses, "groups"],
    queryFn: getCourseGroups,
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};
