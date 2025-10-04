import { Metadata } from "next";

import PageHeader from "@/components/ui/page-header";

import CreateCourseForm from "./CreateCourseForm";

export const metadata: Metadata = {
  title: "Create New Course | Admin | L2brary",
  description: "Create a new learning course",
};

export default function NewCoursePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <PageHeader pageTitle="Tạo lớp học mới" />

        <CreateCourseForm />
      </div>
    </div>
  );
}
