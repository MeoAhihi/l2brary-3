import { SCHEDULE_TYPE_LABELS, WEEKDAY_LABELS } from "@/constants/common";
import type { CourseItem } from "@/types/courses/response";
import { ScheduleTypeEnum } from "@/types/courses/type";

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

interface ScheduleDetail {
  time: string;
  daysOfMonth?: number[];
  daysOfWeek?: string[];
}

// Course schedule formatting functions
export const formatDaysOfWeek = (days?: string[]): string | undefined => {
  if (!days?.length) {
    return undefined;
  }
  return days.map((day) => WEEKDAY_LABELS[day] ?? day.toLowerCase()).join(", ");
};

export const formatDaysOfMonth = (days?: number[]): string | undefined => {
  if (!days?.length) {
    return undefined;
  }
  return days
    .sort((a, b) => a - b)
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
  return course.scheduleDetail?.time ?? "—";
};

export const formatScheduleDetail = (
  scheduleDetail: ScheduleDetail,
  showTime = true,
): string => {
  if (!scheduleDetail || !scheduleDetail.time) return "";
  const time = scheduleDetail.time.replace("-", "đến");

  if (scheduleDetail.daysOfMonth && scheduleDetail.daysOfMonth.length > 0) {
    const sortedDays = [...scheduleDetail.daysOfMonth].sort((a, b) => a - b);
    return showTime
      ? `Ngày ${sortedDays.join(", ")} hằng tháng - ${time}`
      : `Ngày ${sortedDays.join(", ")} hằng tháng`;
  }

  if (scheduleDetail.daysOfWeek && scheduleDetail.daysOfWeek.length > 0) {
    const translatedDays = scheduleDetail.daysOfWeek.map(
      (day) => WEEKDAY_LABELS[day.toUpperCase()] || day,
    );
    return showTime
      ? `${translatedDays.join(", ")} hằng tuần - ${time}`
      : `${translatedDays.join(", ")} hằng tuần`;
  }

  return showTime ? scheduleDetail.time : ""; // Fallback
};
