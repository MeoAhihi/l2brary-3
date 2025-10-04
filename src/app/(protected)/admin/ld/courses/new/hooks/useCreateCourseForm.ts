"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { createCourse } from "@/apis/course.api";
import { ApiError } from "@/types/api";
import { CoursePayload } from "@/types/courses/payload";
import { ScheduleTypeEnum } from "@/types/courses/type";

import { formatScheduleDetail } from "../../helpers";
import { formSchema } from "../schema";
import { useCourseFormFields } from "./useCourseFormFields";

export const useCreateCourseForm = (courseGroupOptions: string[]) => {
  const router = useRouter();
  const mappedCourseGroupOptions = courseGroupOptions.map((group) => ({
    label: group,
    value: group,
  }));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      difficulty: "",
      maxStudents: undefined,
      scheduleType: ScheduleTypeEnum.OneTime,
      group: "",
      recurrentRule: "",
      enrollmentDeadlineDate: undefined,
      startDate: undefined,
      endDate: undefined,
      chatGroupUrl: "",
      isPublic: false,
      isRequireApproval: false,
      isAllowGuestAccess: false,
    },
  });

  const scheduleType = form.watch("scheduleType");

  const fields = useCourseFormFields(scheduleType, mappedCourseGroupOptions);

  const createCourseMutation = useMutation({
    mutationFn: createCourse,
    onSuccess: (data) => {
      toast.success("Tạo khóa học thành công!", {
        description: `Khóa học "${data.title}" đã được tạo thành công.`,
      });

      form.reset();

      router.push(`/admin/ld/courses`);
    },
    onError: (error: ApiError) => {
      console.error("Create course error:", error);

      toast.error("Tạo khóa học thất bại!", {
        description: error?.message || "Đã có lỗi xảy ra khi tạo khóa học.",
      });
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const {
      title,
      description,
      difficulty,
      isPublic,
      isRequireApproval,
      isAllowGuestAccess,
      maxStudents,
      enrollmentDeadlineDate,
      group,
      scheduleType,
      startDate,
      endDate,
      chatGroupUrl,
      recurrentRule,
    } = values;

    const coursePayload: Partial<CoursePayload> = {
      title,
      description,
      difficulty,
      isPublic,
      isRequireApproval,
      isAllowGuestAccess,
      maxStudents,
      enrollmentDeadlineDate,
      group,
      scheduleType,
      startDate,
      chatGroupUrl,
      endDate,
      scheduleDetail: formatScheduleDetail(
        scheduleType,
        recurrentRule ? recurrentRule.split(",") : [],
      ),
    };

    // Sử dụng mutation để call API create course
    createCourseMutation.mutate(coursePayload as CoursePayload);
  };

  return {
    form,
    fields,
    onSubmit,
    isLoading: createCourseMutation.isPending,
    isError: createCourseMutation.isError,
    error: createCourseMutation.error,
    isSuccess: createCourseMutation.isSuccess,
  };
};
