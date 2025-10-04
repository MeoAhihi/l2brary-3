"use client";

import { useMemo } from "react";

import { FormFieldConfig } from "@/components/common/form/types";
import {
  MONTHLY_RECURRENT_OPTIONS,
  RECURRENT_OPTIONS,
  WEEKLY_RECURRENT_OPTIONS,
} from "@/constants/course";
import { LabelValue } from "@/types/common";
import { ScheduleTypeEnum } from "@/types/courses/type";

export function useCourseFormFields(
  scheduleType: string,
  courseGroupOptions: LabelValue[],
) {
  console.info("🚀 ~ useCourseFormFields ~ scheduleType:", scheduleType);
  const fields = useMemo((): FormFieldConfig[] => {
    const baseFields: FormFieldConfig[] = [
      {
        name: "title",
        label: "Tiêu đề",
        type: "text",
        placeholder: "Vật lý Thiên văn",
        description: "Tiêu đề của lớp học mới",
        required: true,
      },
      {
        name: "description",
        label: "Mô tả",
        type: "textarea",
        placeholder: "Mô tả lớp học",
        description: "Thông tin mô tả lớp học dành cho các bạn học sinh.",
      },
      {
        name: "difficulty",
        label: "Độ khó",
        type: "text",
        placeholder: "Nhập độ khó",
        description: "Mức độ khó của lớp học (dễ, trung bình, khó).",
      },
      {
        name: "maxStudents",
        label: "Số học viên tối đa",
        type: "number",
        placeholder: "Nhập số học viên tối đa",
        description: "Số lượng học viên tối đa có thể tham gia lớp học.",
      },
      {
        name: "group",
        label: "Khối lớp",
        type: "select",
        placeholder: "Chọn khối lớp",
        options: courseGroupOptions,
        description: "Phân loại của lớp học mới.",
        required: true,
      },
      {
        name: "scheduleType",
        label: "Loại lớp",
        type: "radio",
        options: RECURRENT_OPTIONS,
        description: "Lớp học một lần/lặp lại",
        required: true,
      },
    ];

    const dynamicFields: FormFieldConfig[] = [];

    if (
      [ScheduleTypeEnum.Weekly, ScheduleTypeEnum.BiWeekly].includes(
        scheduleType as ScheduleTypeEnum,
      )
    ) {
      dynamicFields.push({
        name: "recurrentRule",
        label: "Lịch học",
        type: "multiselect",
        placeholder: "Ngày học",
        options: WEEKLY_RECURRENT_OPTIONS,
        required: true,
      });
    } else if (scheduleType === ScheduleTypeEnum.LunarMonthly) {
      dynamicFields.push({
        name: "recurrentRule",
        label: "Lịch học",
        type: "text",
        placeholder: "Ngày học (âm lịch)",
        required: true,
      });
    } else if (scheduleType === ScheduleTypeEnum.Monthly) {
      dynamicFields.push({
        name: "recurrentRule",
        label: "Lịch học",
        type: "multiselect",
        placeholder: "Chọn ngày trong tháng",
        options: MONTHLY_RECURRENT_OPTIONS,
        required: true,
      });
    } else if (scheduleType === ScheduleTypeEnum.OneTime) {
      dynamicFields.push({
        name: "recurrentRule",
        label: "Ngày diễn ra",
        type: "multidate",
        placeholder: "Chọn ngày",
        required: true,
      });
    }

    const finalFields: FormFieldConfig[] = [
      {
        name: "enrollmentDeadlineDate",
        label: "Hạn chót đăng ký",
        type: "date",
        placeholder: "Chọn ngày",
        description: "Hạn chót để học viên đăng ký tham gia lớp học.",
      },
      {
        type: "group",
        layout: "grid",
        gridCols: 2,
        className: "grid-cols-1 lg:grid-cols-2 gap-4",
        fields: [
          {
            name: "startDate",
            label: "Ngày bắt đầu",
            type: "date",
            placeholder: "Chọn ngày",
            description: "Ngày bắt đầu của lớp học.",
          },
          {
            name: "endDate",
            label: "Ngày kết thúc",
            type: "date",
            placeholder: "Chọn ngày",
            description: "Ngày kết thúc của lớp học.",
          },
        ],
      },
      {
        name: "chatGroupUrl",
        label: "Đường dẫn nhóm chat",
        type: "text",
        placeholder: "https://zalo.me/g/abcxyz",
        description: "Đường dẫn đến nhóm chat (Zalo, Messenger,...).",
      },
      {
        type: "group",
        layout: "horizontal",
        className: "items-start",
        description: "Cài đặt quyền truy cập và hiển thị",
        fields: [
          {
            name: "isPublic",
            label: "Công khai",
            type: "checkbox",
            description: "Cho phép công khai lớp học này.",
          },
          {
            name: "isRequireApproval",
            label: "Phê duyệt học",
            type: "checkbox",
            description: "Yêu cầu phê duyệt trước khi tham gia lớp học này.",
          },
          {
            name: "isAllowGuestAccess",
            label: "Khách mời",
            type: "checkbox",
            description: "Cho phép khách mời thấy nội dung lớp học này.",
          },
        ],
      },
    ];

    return [...baseFields, ...dynamicFields, ...finalFields];
  }, [scheduleType, courseGroupOptions]);

  return fields;
}
