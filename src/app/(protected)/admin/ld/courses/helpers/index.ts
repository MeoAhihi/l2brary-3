import { ScheduleDetail, ScheduleTypeEnum } from "@/types/courses/type";

export function formatScheduleDetail(
  scheduleType: ScheduleTypeEnum,
  recurrentRule: string[],
): ScheduleDetail {
  switch (scheduleType) {
    case ScheduleTypeEnum.Weekly:
    case ScheduleTypeEnum.BiWeekly:
      return { daysOfWeek: recurrentRule };
    case ScheduleTypeEnum.Monthly:
      return { daysOfMonth: recurrentRule };
    case ScheduleTypeEnum.OneTime:
      return { dates: recurrentRule };
    default:
      return {};
  }
}
