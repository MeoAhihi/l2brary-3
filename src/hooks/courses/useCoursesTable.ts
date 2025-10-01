import { getCourses } from "@/apis/course.api";
import { ADMIN_COURSE_PAGE_SIZE } from "@/constants/common";
import { queryKeys } from "@/constants/query-keys";
import type { GetCoursePayload } from "@/types/courses/payload";
import type { CourseItem } from "@/types/courses/response";
import { ScheduleTypeEnum } from "@/types/courses/type";
import type { QueryParams } from "@/types/query";

import { useTable } from "../table/useTable";

interface UseCoursesTableOptions {
  defaultPageSize?: number;
  defaultIsPublic?: boolean;
  forceSkeleton?: boolean;
}

/**
 * Course-specific filter transformation logic
 * Converts generic QueryParams to GetCoursePayload for API consumption
 */
const transformCourseFilters = (
  queryParams: QueryParams,
): Partial<GetCoursePayload> => {
  const { page, limit, title, group, scheduleType, isPublic } = queryParams;

  const parsedScheduleType = Object.values(ScheduleTypeEnum).includes(
    scheduleType as ScheduleTypeEnum,
  )
    ? (scheduleType as ScheduleTypeEnum)
    : undefined;

  const parsedIsPublic =
    typeof isPublic === "string"
      ? isPublic === "true"
      : typeof isPublic === "boolean"
        ? isPublic
        : undefined;

  return {
    page: page ?? 1,
    limit: limit ?? ADMIN_COURSE_PAGE_SIZE,
    ...(title && { title }),
    ...(group && { group }),
    ...(parsedScheduleType && { scheduleType: parsedScheduleType }),
    ...(parsedIsPublic !== undefined && { isPublic: parsedIsPublic }),
  };
};

/**
 * Main hook tổng hợp logic cho CoursesTable component
 * Sử dụng generic table hooks với course-specific logic
 * Có thể dùng cho cả admin và public contexts
 */
export function useCoursesTable(options: UseCoursesTableOptions = {}) {
  const {
    defaultPageSize = ADMIN_COURSE_PAGE_SIZE,
    defaultIsPublic,
    forceSkeleton,
  } = options;

  const tableState = useTable<GetCoursePayload, CourseItem>({
    defaultPageSize,
    defaultFilters:
      defaultIsPublic !== undefined ? { isPublic: defaultIsPublic } : undefined,
    transformFilters: transformCourseFilters,
    apiFunction: getCourses,
    queryKeyPrefix: queryKeys.ld.courses,
    enableSkeleton: true,
    skeletonRowCount: defaultPageSize,
    forceSkeleton,
  });

  // Return with course-specific aliases for backward compatibility
  return {
    ...tableState,
    // Alias generic names to course-specific names
    courses: tableState.items,
    totalCourses: tableState.totalItems,
  };
}
