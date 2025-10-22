import { PAGE_NAME } from "@/types/common";

export const IS_PRODUCTION = process.env.NEXT_PUBLIC_ENV === "production";
export const IS_DEVELOPMENT = process.env.NEXT_PUBLIC_ENV === "development";
export const STATIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL;
export const X_PATHNAME_KEY = "X-Pathname-Key";
export const DEFAULT_PAGE_INDEX = 1;

export const PAGE_LINKS = {
  [PAGE_NAME.LOGIN]: "login",
  [PAGE_NAME.SIGN_UP]: "register",
  [PAGE_NAME.HOME]: "/",
  [PAGE_NAME.ADMIN_DASHBOARD]: "admin/dashboard",
  [PAGE_NAME.LOG_ACTIVITY]: "log-activity",
  [PAGE_NAME.BIRTHDAY]: "admin/dashboard/birthday",
  [PAGE_NAME.MEMBERS]: "admin/dashboard/members",
  [PAGE_NAME.PROFILE]: "admin/dashboard/profile",
};

export const DEFAULT_PAGE_SIZE = 8;
export const ADMIN_COURSE_PAGE_SIZE = 50;
