"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo, useTransition } from "react";

import { CourseCard } from "@/app/(public)/courses/components/CourseCard";
import { SkeletonGrid } from "@/components/common/SkeletonGrid";
import { PaginationButtons } from "@/components/ui/pagination-buttons";
import { useQueryFilters } from "@/hooks/useQueryFilters";

import { courseListQueryOptions } from "../queries";
import type { GetCoursePayload } from "../types/payload";
import type { CoursesResponse } from "../types/response";
import { EmptyCourses } from "./EmptyCourses";

interface CourseWrapperProps {
  initialData: CoursesResponse;
  baseFilters: Partial<GetCoursePayload>;
  hasAdvancedFilters: boolean;
}

export const CourseWrapper = ({
  initialData,
  baseFilters,
  hasAdvancedFilters,
}: CourseWrapperProps) => {
  const { queryParams, setQueryParams } = useQueryFilters(baseFilters);
  const [isPending, startTransition] = useTransition();

  const handlePageChange = (newPage: number) => {
    startTransition(() => {
      setQueryParams({ page: newPage });
    });
  };

  const queryOptions = useMemo(
    () => courseListQueryOptions(queryParams),
    [queryParams],
  );

  const queryResult = useQuery({
    ...queryOptions,
    enabled: hasAdvancedFilters,
    initialData: hasAdvancedFilters ? undefined : initialData,
  });

  const data =
    queryResult.data ?? (hasAdvancedFilters ? undefined : initialData);
  const isFetchingFiltered =
    hasAdvancedFilters && (queryResult.isFetching || !queryResult.data);

  const showSkeleton = isPending || isFetchingFiltered || !data;
  const hasCourses = Boolean(data && data.items.length > 0);
  const shouldShowEmpty = !showSkeleton && !hasCourses;
  const shouldShowPagination = Boolean(data && data.pageCount > 1);

  const coursesGrid = useMemo(() => {
    if (!data || data.items.length === 0) {
      return null;
    }

    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {data.items.map((course) => (
          <CourseCard
            key={course.id}
            id={course.id}
            title={course.title}
            description={course.description}
            recurrentRule={course.scheduleDetail}
            thumbnail={course.thumbnail}
            studentsCount={course.maxStudents}
          />
        ))}
      </div>
    );
  }, [data]);

  const renderCourses = () => {
    if (showSkeleton) return <SkeletonGrid />;

    if (hasCourses) return coursesGrid;

    if (shouldShowEmpty) return <EmptyCourses />;
  };

  return (
    <div className="space-y-8">
      <div className="min-h-[16rem]">{renderCourses()}</div>

      {shouldShowPagination && data && (
        <PaginationButtons
          page={data.page}
          totalPages={data.pageCount}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};
