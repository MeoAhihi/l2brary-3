import { Metadata } from "next";
import { notFound } from "next/navigation";

import { getCourseById } from "@/apis/course.api";

import CourseDetailPage from "./components/CourseDetailPage";

interface CoursePageProps {
  params: Promise<{
    "course-id": string;
  }>;
}

export async function generateMetadata({
  params,
}: CoursePageProps): Promise<Metadata> {
  const { "course-id": courseId } = await params;
  const course = await getCourseById(courseId);

  if (!course) {
    return {
      title: "Course not found",
    };
  }

  return {
    title: `${course.title} | L2brary`,
    description: course.description,
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { "course-id": courseId } = await params;
  const course = await getCourseById(courseId);

  if (!course) {
    notFound();
  }

  return <CourseDetailPage course={course} />;
}
