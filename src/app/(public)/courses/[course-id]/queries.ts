import { getCourseById } from "@/apis/course.api";
import { queryKeys } from "@/constants/query-keys";
import type { CourseItem } from "@/types/courses/response";

export const courseDetailQueryOptions = (courseId: string) => ({
  queryKey: [...queryKeys.ld.coursesDetail, courseId] as const,
  queryFn: async (): Promise<CourseItem | null> => {
    const course = await getCourseById(courseId);
    return course ?? null;
  },
  staleTime: 10 * 60 * 1000,
});
