import { Metadata } from "next";
import { notFound } from "next/navigation";

import { APP_URL } from "@/constants/common";
import { getServerQueryClient } from "@/lib/react-query-server";

import CourseDetailPage from "./components/CourseDetailPage";
import { courseDetailQueryOptions } from "./queries";

type CoursePageParams = {
  "course-id": string;
};

type CoursePageProps = {
  params: Promise<CoursePageParams>;
};

export const revalidate = 600;

export async function generateMetadata({
  params,
}: CoursePageProps): Promise<Metadata> {
  const { "course-id": courseId } = await params;
  const queryClient = getServerQueryClient();
  const course = await queryClient.fetchQuery(
    courseDetailQueryOptions(courseId),
  );

  if (!course) {
    return { title: "Course not found" };
  }

  return {
    title: `${course.title} | L2brary`,
    description: course.description,
    openGraph: {
      title: `${course.title} | L2brary`,
      description: course.description,
      url: `${APP_URL}/courses/${courseId}`,
      images: [{ url: course?.thumbnail || "", alt: course.title }],
    },
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { "course-id": courseId } = await params;
  const queryClient = getServerQueryClient();
  const course = await queryClient.ensureQueryData(
    courseDetailQueryOptions(courseId),
  );

  if (!course) {
    notFound();
  }

  return <CourseDetailPage course={course} />;
}
