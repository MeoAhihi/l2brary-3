"use client";

import { Plus } from "lucide-react";
import { toast } from "sonner";

import { EnhancedCustomForm } from "@/components/common/form";

import { useGetCourseGroup } from "../hooks/useGetCourseGroup";
import { useCreateCourseForm } from "./hooks/useCreateCourseForm";

export default function CreateCourseForm() {
  const { data, isFetching } = useGetCourseGroup({
    onError: (error) => {
      toast.error("Không thể tải danh sách khối lớp: " + error.message);
    },
  });

  const {
    form,
    fields,
    onSubmit,
    isLoading: isSubmitting,
  } = useCreateCourseForm(data || [""]);

  return (
    <EnhancedCustomForm
      isLoading={isFetching}
      isSubmitting={isSubmitting}
      form={form}
      fields={fields}
      onSubmitAction={onSubmit}
      submitButtonText={
        <>
          <Plus className="mr-2 h-4 w-4" />
          {isSubmitting ? "Đang tạo..." : "Tạo lớp học mới"}
        </>
      }
      className="mx-auto max-w-3xl space-y-8 py-10"
    />
  );
}
