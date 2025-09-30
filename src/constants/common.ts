import { PAGE_NAME } from "@/types/common";
import { ScheduleTypeEnum } from "@/types/courses/type";

export const IS_PRODUCTION = process.env.NEXT_PUBLIC_ENV === "production";
export const IS_DEVELOPMENT = process.env.NEXT_PUBLIC_ENV === "development";
export const STATIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL;
export const X_PATHNAME_KEY = "X-Pathname-Key";
export const DEFAULT_PAGE_INDEX = 1;

export const PAGE_LINKS = {
  [PAGE_NAME.LOGIN]: "login",
  [PAGE_NAME.SIGN_UP]: "sign-up",
  [PAGE_NAME.DASHBOARD]: "dashboard",
  [PAGE_NAME.BIRTHDAY]: "dashboard/birthday",
  [PAGE_NAME.MEMBERS]: "dashboard/members",
  [PAGE_NAME.PROFILE]: "dashboard/profile",
};

export const DEFAULT_PAGE_SIZE = 8;
export const ADMIN_COURSE_PAGE_SIZE = 50;

// Weekday labels for Vietnamese locale
export const WEEKDAY_LABELS: Record<string, string> = {
  MONDAY: "Thứ 2",
  TUESDAY: "Thứ 3",
  WEDNESDAY: "Thứ 4",
  THURSDAY: "Thứ 5",
  FRIDAY: "Thứ 6",
  SATURDAY: "Thứ 7",
  SUNDAY: "Chủ nhật",
};

// Schedule type labels for Vietnamese locale
export const SCHEDULE_TYPE_LABELS: Record<ScheduleTypeEnum, string> = {
  [ScheduleTypeEnum.Weekly]: "Hàng tuần",
  [ScheduleTypeEnum.Monthly]: "Hàng tháng",
  [ScheduleTypeEnum.LunarMonthly]: "Âm lịch",
  [ScheduleTypeEnum.OneTime]: "Một lần",
};
