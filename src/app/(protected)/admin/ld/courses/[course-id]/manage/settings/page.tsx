"use client";

import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { AccessVisibilityForm } from "./components/AccessVisibilityForm";
import { BasicInfoForm } from "./components/BasicInfoForm";
import { CourseScheduleForm } from "./components/CourseScheduleForm";
import { SettingsPageSkeleton } from "./components/SettingsPageSkeleton";
import { useCourseSettingsForm } from "./hooks/useCourseSettingsForm";

export default function SettingsPage() {
  const params = useParams();
  const courseId = params["course-id"] as string;

  const { form, onSubmit, isLoading } = useCourseSettingsForm(courseId);

  const { handleSubmit } = form;

  if (isLoading) {
    return <SettingsPageSkeleton />;
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <BasicInfoForm control={form.control} />
        <CourseScheduleForm control={form.control} />
        <AccessVisibilityForm control={form.control} />

        <div className="flex justify-end space-x-2">
          <Button variant="outline" type="button">
            Hủy
          </Button>
          <Button type="submit">Lưu Thay Đổi</Button>
        </div>
      </form>
    </Form>
  );
}
