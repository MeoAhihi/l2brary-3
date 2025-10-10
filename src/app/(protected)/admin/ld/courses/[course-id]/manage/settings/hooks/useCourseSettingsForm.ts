"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { updateCourse } from "@/apis/course.api";
import { formatScheduleDetail } from "@/app/(protected)/admin/ld/courses/helpers";
import { useGetCourseById } from "@/hooks/courses/useGetCourseById";
import { invalidateQueries } from "@/lib/query-client";

import {
  courseSettingsDefaultValues,
  CourseSettingsFormValues,
  courseSettingsSchema,
} from "../schema";

interface UseCourseSettingsFormReturn {
  form: ReturnType<typeof useForm<CourseSettingsFormValues>>;
  onSubmit: SubmitHandler<CourseSettingsFormValues>;
  isLoading: boolean;
  isSubmitting: boolean;
}

export function useCourseSettingsForm(
  courseId: string,
): UseCourseSettingsFormReturn {
  const { data: courseData, isLoading } = useGetCourseById(courseId);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CourseSettingsFormValues>({
    resolver: zodResolver(courseSettingsSchema),
    defaultValues: courseSettingsDefaultValues,
  });

  useEffect(() => {
    if (courseData) {
      form.reset({
        title: courseData.title,
        code: courseData.code ?? "",
        description: courseData.description,
        group: courseData.group,
        difficulty: courseData.difficulty,
        thumbnail: courseData.thumbnail,
        chatGroupUrl: courseData.chatGroupUrl,
        isPublic: courseData.isPublic,
        isRequireApproval: courseData.isRequireApproval,
        isAllowGuestAccess: courseData.isAllowGuestAccess,
        startDate: courseData.startDate ?? undefined,
        endDate: courseData.endDate ?? undefined,
        maxStudents: courseData.maxStudents,
        enrollmentDeadlineDate: courseData.enrollmentDeadline ?? "",
        scheduleType: courseData.scheduleType || "",
        startTime: courseData.startTime,
        endTime: courseData.endTime,
        recurrentRule: courseData.scheduleDetail?.daysOfWeek || [],
      });
    }
  }, [courseData, form]);

  const mutation = useMutation({
    mutationFn: (payload: CourseSettingsFormValues) =>
      updateCourse(courseId, payload),
  });

  const onSubmit: SubmitHandler<CourseSettingsFormValues> = async (values) => {
    setIsSubmitting(true);

    // Format the payload to include scheduleDetail
    const { scheduleType, recurrentRule, ...restValues } = values;

    const payload = {
      ...restValues,
      scheduleType,
      scheduleDetail:
        scheduleType && recurrentRule
          ? formatScheduleDetail(
              scheduleType,
              Array.isArray(recurrentRule)
                ? recurrentRule
                : recurrentRule
                  ? recurrentRule.split(",")
                  : [],
            )
          : undefined,
    };

    mutation.mutate(payload, {
      onSuccess: (data) => {
        console.log("=====>", data);

        toast("Cập nhật thông tin khóa học thành công");
        invalidateQueries.courseDetail();
      },
    });

    setIsSubmitting(false);
  };

  return {
    form,
    onSubmit,
    isLoading,
    isSubmitting,
  };
}
