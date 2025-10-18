import { SCHEDULE_TYPE_LABELS, WEEKDAY_LABELS } from "@/constants/course";
import type { CourseItem } from "@/types/courses/response";
import {
  ScheduleDetail,
  ScheduleTypeEnum,
  WeekTypeEnum,
} from "@/types/courses/type";

export function decodeVietnameseUrl(str: string): string {
  return decodeURIComponent(str);
}

export function encodeVietnameseUrl(str: string): string {
  return encodeURIComponent(str);
}

export const urlDisplayMapping: Record<string, string> = {
  dashboard: "Bảng điều khiển",
  12345: "Anh văn",
  56789: "Giao tiếp",
  classes: "Lớp học",
  overview: "Tổng quan",
  members: "Thành viên",
  list: "Danh sách",
  birthday: "Sinh nhật",
  skills: "Kỹ năng",
  "score-table": "Bảng điểm",
  translation: "Phiên dịch",
  "sunday-english": "AV chủ nhật",
  "thursday-english": "AV thứ 5",
  "crowd-communication": "Giao tiếp đám đông",
  "attraction-communication": "Giao tiếp thu hút",
};

export function getDisplayNameFromUrl(urlSegment: string): string {
  if (urlDisplayMapping[urlSegment]) {
    return urlDisplayMapping[urlSegment];
  }

  const decoded = decodeVietnameseUrl(urlSegment);
  return decoded.charAt(0).toUpperCase() + decoded.slice(1);
}

// Course schedule formatting functions
export const formatDaysOfWeek = (days?: string[]): string | undefined => {
  if (!days?.length) {
    return undefined;
  }
  return days
    .map((day) => WEEKDAY_LABELS[day as WeekTypeEnum] ?? day.toLowerCase())
    .join(", ");
};

export const formatDaysOfMonth = (days?: string[]): string | undefined => {
  if (!days?.length) {
    return undefined;
  }
  return days
    .sort((a, b) => Number(a) - Number(b))
    .map((day) => `ngày ${day}`)
    .join(", ");
};

export const formatScheduleRule = (course: CourseItem): string => {
  const prefix =
    SCHEDULE_TYPE_LABELS[course.scheduleType] ?? course.scheduleType;
  const detail = course.scheduleDetail;

  if (!detail) {
    return prefix;
  }

  if (course.scheduleType === ScheduleTypeEnum.Weekly) {
    const days = formatDaysOfWeek(detail.daysOfWeek);
    return days ? `${prefix} • ${days}` : prefix;
  }

  if (
    course.scheduleType === ScheduleTypeEnum.Monthly ||
    course.scheduleType === ScheduleTypeEnum.LunarMonthly
  ) {
    const days = formatDaysOfMonth(detail.daysOfMonth);
    return days ? `${prefix} • ${days}` : prefix;
  }

  return prefix;
};

export const formatTimeRange = (course: CourseItem): string => {
  switch (course.scheduleType) {
    case ScheduleTypeEnum.Weekly:
      return `Hàng tuần • ${course.scheduleDetail.daysOfWeek?.map((d) => WEEKDAY_LABELS[d as WeekTypeEnum]).join(", ")} • ${course.startTime.slice(0, 5)}-${course.endTime.slice(0, 5)}`;
    case ScheduleTypeEnum.BiWeekly:
      return `Cách tuần • ${course.scheduleDetail.daysOfWeek?.map((d) => WEEKDAY_LABELS[d as WeekTypeEnum]).join(", ")} • ${course.startTime.slice(0, 5)}-${course.endTime.slice(0, 5)}`;
    case ScheduleTypeEnum.Monthly:
      return `Hàng tháng • ${course.scheduleDetail.daysOfMonth?.join(", ") ?? "—"} • ${course.startTime.slice(0, 5)}-${course.endTime.slice(0, 5)}`;
    case ScheduleTypeEnum.OneTime:
      // get first and last date from course.scheduleDetail.dates, if there's only 1 date, make indication
      if (new Date(course.startDate) === new Date(course.endDate)) {
        return `Một lần • ngày ${course.startDate} • ${course.startTime.slice(0, 5)}-${course.endTime.slice(0, 5)}`;
      }
      return `Một lần • từ ${course.startDate} đến ${course.endDate} • ${course.startTime.slice(0, 5)}-${course.endTime.slice(0, 5)}`;
    case ScheduleTypeEnum.LunarMonthly:
      return `Âm lịch • ${course.scheduleDetail.daysOfMonth?.join(", ") ?? "—"} • ${course.startTime.slice(0, 5)}-${course.endTime.slice(0, 5)}`;
    default:
      return "—";
  }
};

export const formatScheduleDetail = (
  scheduleDetail: ScheduleDetail,
  showTime = true,
) => {
  if (!scheduleDetail) return "";
  const time = scheduleDetail?.time?.replace("-", "đến");

  if (scheduleDetail.daysOfMonth && scheduleDetail.daysOfMonth.length > 0) {
    const sortedDays = [...scheduleDetail.daysOfMonth].sort(
      (a, b) => Number(a) - Number(b),
    );
    return showTime
      ? `Ngày ${sortedDays.join(", ")} hằng tháng - ${time}`
      : `Ngày ${sortedDays.join(", ")} hằng tháng`;
  }

  if (scheduleDetail.daysOfWeek && scheduleDetail.daysOfWeek.length > 0) {
    const translatedDays = scheduleDetail.daysOfWeek.map(
      (day) => WEEKDAY_LABELS[day as WeekTypeEnum] || day,
    );
    return showTime
      ? `${translatedDays.join(", ")} hằng tuần - ${time}`
      : `${translatedDays.join(", ")} hằng tuần`;
  }

  return showTime ? scheduleDetail?.time : ""; // Fallback
};

/**
 * Converts an array of objects (with a `value` property) to a comma-separated string.
 * If the input is already a string, returns as is.
 * If the input is an array, extracts `value` from each object or uses the item itself.
 * Otherwise, returns the string representation of the input.
 */
export const arrayObjectToCommaString = (
  input: unknown,
): string | undefined => {
  if (!input) return undefined;

  if (typeof input === "string") {
    return input;
  }

  if (Array.isArray(input)) {
    return input
      .map((item) =>
        typeof item === "object" && item !== null && "value" in item
          ? (item as { value?: string }).value
          : item,
      )
      .filter(Boolean)
      .join(",");
  }

  return String(input);
};

export const commaStringToArray = (str: string | undefined): string[] => {
  if (!str) {
    return [];
  }
  return str
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
};
