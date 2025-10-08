import { z } from "zod";

import { ScheduleTypeEnum } from "@/types/courses/type";

export const courseSettingsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  code: z.string().optional(),
  description: z.string().optional(),
  group: z.string().optional(),
  difficulty: z.string().optional(),
  thumbnail: z.string().url().optional().or(z.literal("")),
  chatGroupUrl: z.string().url().optional().or(z.literal("")),
  isPublic: z.boolean().default(false),
  isRequireApproval: z.boolean().default(false),
  isAllowGuestAccess: z.boolean().default(false),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  maxStudents: z.coerce.number().optional(),
  enrollmentDeadlineDate: z.string().optional(),
  scheduleType: z.nativeEnum(ScheduleTypeEnum).optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  recurrentRule: z.union([z.string(), z.array(z.string())]).optional(),
});

export type CourseSettingsFormValues = z.infer<typeof courseSettingsSchema>;

export const courseSettingsDefaultValues: CourseSettingsFormValues = {
  title: "",
  code: "",
  description: "",
  group: "",
  difficulty: "",
  thumbnail: "",
  chatGroupUrl: "",
  isPublic: false,
  isRequireApproval: false,
  isAllowGuestAccess: false,
  startDate: "",
  endDate: "",
  maxStudents: 0,
  enrollmentDeadlineDate: "",
  scheduleType: ScheduleTypeEnum.OneTime,
  startTime: "",
  endTime: "",
  recurrentRule: [],
};

export default courseSettingsSchema;
