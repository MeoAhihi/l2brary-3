import { getPublicCourses } from "@/apis/course.api";
import { queryKeys } from "@/constants/query-keys";
import type { GetCoursePayload } from "@/types/courses/payload";
import type { CoursesResponse } from "@/types/courses/response";

export const courseListQueryOptions = (params: Partial<GetCoursePayload>) => ({
  queryKey: [...queryKeys.ld.courses, params] as const,
  queryFn: async (): Promise<CoursesResponse> => getPublicCourses(params),
  staleTime: 10 * 60 * 1000,
});
