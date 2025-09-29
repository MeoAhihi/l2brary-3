import { DEFAULT_PAGE_SIZE } from "@/constants/common";
import { QUERY_PARAMS } from "@/constants/query-params";
import { getNumericParam } from "@/lib/param";
import { getServerQueryClient } from "@/lib/react-query-server";
import type { GetCoursePayload } from "@/types/courses/payload";

import { CourseWrapper } from "./components/CourseWrapper";
import { CourseProvider } from "./contexts";
import { courseListQueryOptions } from "./queries";

export const metadata = {
  title: "Courses | L2brary",
  description: "Browse available courses and learning opportunities",
};

export const revalidate = 600;

type CoursesPageSearchParams = Record<string, string | string[] | undefined>;

interface CoursesPageProps {
  searchParams?: Promise<CoursesPageSearchParams>;
}

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  const resolvedSearchParams =
    searchParams !== undefined ? await searchParams : {};

  const page = getNumericParam(resolvedSearchParams[QUERY_PARAMS.PAGE], 1);
  const limit = getNumericParam(
    resolvedSearchParams[QUERY_PARAMS.LIMIT],
    DEFAULT_PAGE_SIZE,
  );
  const baseFilters: Partial<GetCoursePayload> = {
    page,
    limit,
  };

  const hasAdvancedFilters = Object.keys(resolvedSearchParams).some(
    (key) => key !== QUERY_PARAMS.PAGE && key !== QUERY_PARAMS.LIMIT,
  );

  const queryClient = getServerQueryClient();
  const courses = await queryClient.ensureQueryData(
    courseListQueryOptions(baseFilters),
  );

  return (
    <CourseProvider>
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-6 text-3xl font-bold">Courses</h1>
          <p className="text-muted-foreground mb-8">
            Discover and enroll in courses to enhance your skills
          </p>
          <CourseWrapper
            initialData={courses}
            baseFilters={baseFilters}
            hasAdvancedFilters={hasAdvancedFilters}
          />
        </div>
      </div>
    </CourseProvider>
  );
}
