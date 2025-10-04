import { PAGE_NAME } from "@/types/common";

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
