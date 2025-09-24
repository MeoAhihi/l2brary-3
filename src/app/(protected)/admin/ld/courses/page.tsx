import { Metadata } from "next";

import { getCourses } from "@/apis/ld.api";
import PageHeader from "@/components/ui/page-header";

import { CoursesTable } from "./courses-table";

export const metadata: Metadata = {
  title: "Courses | Admin | L2brary",
  description: "Manage all learning & development courses",
};

export default async function AdminCoursesPage() {
  const courses = await getCourses();
  return (
    <>
      <PageHeader pageTitle="Courses List" />
      <div>
        <CoursesTable courses={courses} />
      </div>
    </>
  );
}
