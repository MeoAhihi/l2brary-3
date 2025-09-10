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
          isReccurentOptions={[
            { label: "Thường xuyên", value: "true" },
            { label: "Một lần", value: "false" },
          ]}
          courseGroupOptions={[
            { label: "Nghiên cứu Khoa học", value: "course-id-001" },
            { label: "Thí nghiệm Vật lý", value: "course-id-002" },
            { label: "Hoạt động dã ngoại", value: "course-id-003" },
          ]}
          recurrentRuleOptions={[
            { label: "Hàng tuần", value: "weekly" },
            { label: "Hàng tháng", value: "monthly" },
            { label: "Cách tuần", value: "biweekly" },
            { label: "Tuần lẻ", value: "odd-week" },
            { label: "Tuần chẵn", value: "even-week" },
          ]}
        />
      </div>
    </div>
  );
}
