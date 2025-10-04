import { z } from "zod";

import { formatDateToYMD } from "@/lib/datetime";
import { arrayObjectToCommaString } from "@/lib/format";
import { ScheduleTypeEnum } from "@/types/courses/type";

/**
 * Helper to create date field that accepts both string and Date objects
 */
const dateField = () =>
  z
    .union([z.string(), z.date()])
    .transform((val) => {
      if (val instanceof Date) {
        return formatDateToYMD(val.toISOString());
      }
      return formatDateToYMD(val);
    })
    .optional();

export const formSchema = z
  .object({
    title: z.string().min(1, "Tiêu đề không được để trống"),
    description: z.string().optional(),
    difficulty: z.string().optional(),
    maxStudents: z
      .number({ invalid_type_error: "Số học viên tối đa phải là một số" })
      .min(0, "Số học viên tối đa không được âm")
      .optional(),
    scheduleType: z.nativeEnum(ScheduleTypeEnum, {
      errorMap: () => ({ message: "Vui lòng chọn loại lớp." }),
    }),
    group: z.string({ required_error: "Vui lòng chọn khối lớp." }),
    recurrentRule: z.unknown().transform(arrayObjectToCommaString).optional(),
    enrollmentDeadlineDate: dateField(),
    startDate: dateField(),
    endDate: dateField(),
    chatGroupUrl: z
      .string()
      .url("Đường dẫn không hợp lệ")
      .optional()
      .or(z.literal("")),
    isPublic: z.boolean().optional(),
    isRequireApproval: z.boolean().optional(),
    isAllowGuestAccess: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    if (
      [
        ScheduleTypeEnum.BiWeekly,
        ScheduleTypeEnum.Monthly,
        ScheduleTypeEnum.Weekly,
      ].includes(data["scheduleType"] as ScheduleTypeEnum) &&
      !data["recurrentRule"]
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["recurrentRule"],
        message: "Vui lòng chọn lịch học.",
      });
    }
    if (data["scheduleType"] === ScheduleTypeEnum.OneTime) {
      if (!data["recurrentRule"]) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["recurrentRule"],
          message: "Vui lòng chọn ngày diễn ra.",
        });
      }
      if (!data["recurrentRule"]) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["recurrentRule"],
          message: "Vui lòng chọn buổi học.",
        });
      }
    }
  });
