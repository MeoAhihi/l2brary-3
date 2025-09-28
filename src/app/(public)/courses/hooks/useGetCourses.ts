"use client";

import { useQuery } from "@tanstack/react-query";

import { getPublicCourses } from "@/apis/course.api";
import { queryKeys } from "@/constants/query-keys";

import { GetCoursePayload } from "../types/payload";

export const useGetCourses = (params: Partial<GetCoursePayload>) => {
  return useQuery({
    queryKey: [queryKeys.ld.courses, params],
    queryFn: () => getPublicCourses(params),
  });
};
