import { DataTable } from "@/components/ui/data-table";
import { Metadata } from "next";
import { columns } from "./columns"
import courses from '@/constants/courses.json'

export const metadata: Metadata = {
  title: "Courses | Admin | L2brary",
  description: "Manage all learning & development courses",
};

export default function AdminCoursesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Courses</h1>
        <p className="text-muted-foreground mb-8">
          View and manage all courses in the Learning & Development domain.
        </p>
        <DataTable
          columns={columns}
          title="Danh sách lớp học"
          data={courses}
        />
      </div>
    </div>
  );
}
