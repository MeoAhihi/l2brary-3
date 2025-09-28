"use client";

import { CourseCard } from "@/components/course/course-card";
import { PaginationButtons } from "@/components/ui/pagination-buttons";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryFilters } from "@/hooks/useQueryFilters";

import { useGetCourses } from "../hooks/useGetCourses";

export const CourseWrapper = () => {
  const { queryParams, setQueryParams } = useQueryFilters();

  const { data, isLoading, isError } = useGetCourses(queryParams);

  const handlePageChange = (newPage: number) => {
    setQueryParams({ page: newPage });
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-64 w-full" />
        ))}
      </div>
    );
  }

  if (isError || !data) {
    return <div>Error fetching courses.</div>;
  }

  return (
    <div>
      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {data.items.map((course) => (
          <CourseCard
            key={course.id}
            id={course.id}
            title={course.title}
            description={course.description}
            recurrentRule={course.scheduleType}
            thumbnail={course.thumbnail}
            studentsCount={course.maxStudents}
          />
        ))}
      </div>
      <PaginationButtons
        page={data.page}
        totalPages={data.pageCount}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
