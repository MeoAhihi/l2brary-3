import { useMemo } from "react";

import { DEFAULT_PAGE_INDEX } from "@/constants/common";
import { useQueryFilters } from "@/hooks/useQueryFilters";
import type { GetCoursePayload } from "@/types/courses/payload";
import { ScheduleTypeEnum } from "@/types/courses/type";

interface UseCourseFiltersOptions {
  defaultPageSize: number;
  defaultIsPublic?: boolean;
}

/**
 * Generic hook để quản lý filters cho courses
 * Có thể dùng cho cả admin và public contexts
 */
export function useCourseFilters({
  defaultPageSize,
  defaultIsPublic,
}: UseCourseFiltersOptions) {
  const defaultParams = useMemo(
    () => ({
      page: DEFAULT_PAGE_INDEX,
      limit: defaultPageSize,
      ...(defaultIsPublic !== undefined && { isPublic: defaultIsPublic }),
    }),
    [defaultPageSize, defaultIsPublic],
  );

  const { queryParams, setQueryParams } = useQueryFilters(defaultParams);

  // Transform URL params to API payload với validation
  const apiParams = useMemo<Partial<GetCoursePayload>>(() => {
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
      page: page ?? DEFAULT_PAGE_INDEX,
      limit: limit ?? defaultPageSize,
      title: typeof title === "string" ? title : undefined,
      group: typeof group === "string" ? group : undefined,
      scheduleType: parsedScheduleType,
      isPublic: parsedIsPublic,
    } satisfies Partial<GetCoursePayload>;
  }, [queryParams, defaultPageSize]);

  // Helper functions cho filter updates
  const updateFilters = (filters: Partial<GetCoursePayload>) => {
    setQueryParams(filters);
  };

  const clearFilters = () => {
    setQueryParams({
      page: DEFAULT_PAGE_INDEX,
      limit: defaultPageSize,
      ...(defaultIsPublic !== undefined && { isPublic: defaultIsPublic }),
    });
  };

  const resetToFirstPage = () => {
    setQueryParams({ page: DEFAULT_PAGE_INDEX });
  };

  return {
    queryParams,
    apiParams,
    updateFilters,
    clearFilters,
    resetToFirstPage,
  };
}
