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

const dayOfWeekMapping: { [key: string]: string } = {
  MONDAY: "thứ 2",
  TUESDAY: "thứ 3",
  WEDNESDAY: "thứ 4",
  THURSDAY: "thứ 5",
  FRIDAY: "thứ 6",
  SATURDAY: "thứ 7",
  SUNDAY: "chủ nhật",
};

export const formatScheduleDetail = (
  scheduleDetail: ScheduleDetail,
): string => {
  if (!scheduleDetail || !scheduleDetail.time) return "";
  const time = scheduleDetail.time.replace("-", "đến");

  if (scheduleDetail.daysOfMonth && scheduleDetail.daysOfMonth.length > 0) {
    const sortedDays = [...scheduleDetail.daysOfMonth].sort((a, b) => a - b);
    return `Ngày ${sortedDays.join(", ")} hằng tháng - ${time}`;
  }

  if (scheduleDetail.daysOfWeek && scheduleDetail.daysOfWeek.length > 0) {
    const translatedDays = scheduleDetail.daysOfWeek.map(
      (day) => dayOfWeekMapping[day.toUpperCase()] || day,
    );
    return `${translatedDays.join(", ")} hằng tuần - ${time}`;
  }

  return scheduleDetail.time; // Fallback
};
