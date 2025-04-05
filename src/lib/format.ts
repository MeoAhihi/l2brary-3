export function decodeVietnameseUrl(str: string): string {
  return decodeURIComponent(str);
}

export function encodeVietnameseUrl(str: string): string {
  return encodeURIComponent(str);
}

export const urlDisplayMapping: Record<string, string> = {
  dashboard: "Bảng điều khiển",
  english: "Anh văn",
  communication: "Giao tiếp",
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
