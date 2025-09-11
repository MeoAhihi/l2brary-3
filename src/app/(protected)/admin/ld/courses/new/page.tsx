import { Metadata } from "next";
import CreateCourseForm from "./create-course-form";
import PageHeader from "@/components/ui/page-header";

export const metadata: Metadata = {
  title: "Create New Course | Admin | L2brary",
  description: "Create a new learning course",
};

export default function NewCoursePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <PageHeader pageTitle="Tạo lớp học mới" />

        <CreateCourseForm
          courseGroupOptions={[
            { label: "Nghiên cứu Khoa học", value: "course-id-001" },
            { label: "Thí nghiệm Vật lý", value: "course-id-002" },
            { label: "Hoạt động dã ngoại", value: "course-id-003" },
          ]}
        />
      </div>
    </div>
  );
}
