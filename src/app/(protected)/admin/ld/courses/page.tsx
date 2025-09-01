import { Metadata } from "next";
import { columns } from "./columns";
import courses from "@/constants/courses.json";
import PageHeader from "@/components/ui/page-header";
import { DataTable } from "@/components/ui/data-table";

export const metadata: Metadata = {
  title: "Courses | Admin | L2brary",
  description: "Manage all learning & development courses",
};

export default function AdminCoursesPage() {
  return (
    <>
      <PageHeader pageTitle="Courses List" />
      <div>
        <DataTable
          title="Danh sách khoá học"
          columns={columns}
          data={courses}
          filterField={["title", "classGroup"]}
          createPage="/dashboard/ld/courses/new"
        />
      </div>
    </>
  );
}
