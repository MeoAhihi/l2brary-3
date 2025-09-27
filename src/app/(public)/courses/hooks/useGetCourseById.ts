"use client";

import { useQuery } from "@tanstack/react-query";

import { getCourseById } from "@/apis/course.api";
import { queryKeys } from "@/constants/query-keys";

export const useGetCourseById = (courseId: string) => {
  return useQuery({
    queryKey: [queryKeys.ld.courses, courseId],
    queryFn: () => getCourseById(courseId),
    enabled: !!courseId, // Only run the query if courseId is available
  });
};
