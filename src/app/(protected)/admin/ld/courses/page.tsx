import { Metadata } from "next";

import PageHeader from "@/components/ui/page-header";

import { CoursesTable } from "./courses-table";

export const metadata: Metadata = {
  title: "Courses | Admin | L2brary",
  description: "Manage all learning & development courses",
};

export default async function AdminCoursesPage() {
  return (
    <div>
      <PageHeader pageTitle="Courses List" />
      <CoursesTable />
    </div>
  );
}
