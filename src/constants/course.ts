import { ScheduleTypeEnum, WeekTypeEnum } from "@/types/courses/type";

// Weekday labels for Vietnamese locale
export const WEEKDAY_LABELS: Record<WeekTypeEnum, string> = {
  [WeekTypeEnum.MONDAY]: "Thứ 2",
  [WeekTypeEnum.TUESDAY]: "Thứ 3",
  [WeekTypeEnum.WEDNESDAY]: "Thứ 4",
  [WeekTypeEnum.THURSDAY]: "Thứ 5",
  [WeekTypeEnum.FRIDAY]: "Thứ 6",
  [WeekTypeEnum.SATURDAY]: "Thứ 7",
  [WeekTypeEnum.SUNDAY]: "Chủ nhật",
};

// Schedule type labels for Vietnamese locale
export const SCHEDULE_TYPE_LABELS: Record<ScheduleTypeEnum, string> = {
  [ScheduleTypeEnum.Weekly]: "Hàng tuần",
  [ScheduleTypeEnum.Monthly]: "Hàng tháng",
  [ScheduleTypeEnum.LunarMonthly]: "Âm lịch",
  [ScheduleTypeEnum.OneTime]: "Một lần",
  [ScheduleTypeEnum.BiWeekly]: "Hai tuần một lần",
};

// Recurrent options for form fields
export const RECURRENT_OPTIONS = Object.values(ScheduleTypeEnum).map(
  (type) => ({
    label: SCHEDULE_TYPE_LABELS[type],
    value: type,
  }),
);

export const WEEKLY_RECURRENT_OPTIONS = Object.values(WeekTypeEnum).map(
  (type) => ({
    label: type,
    value: type,
  }),
);

export const MONTHLY_RECURRENT_OPTIONS = Array.from(
  { length: 31 },
  (_, i) => i + 1,
).map((day) => ({
  label: `Ngày ${day}`,
  value: String(day),
}));
