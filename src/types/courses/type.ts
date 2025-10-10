/* eslint-disable no-unused-vars */

export enum WeekTypeEnum {
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY",
}

export enum ScheduleTypeEnum {
  Weekly = "WEEKLY",
  Monthly = "MONTHLY",
  LunarMonthly = "LUNAR_MONTHLY",
  OneTime = "ONE_TIME",
  BiWeekly = "BI_WEEKLY",
}

export interface ScheduleDetail {
  time?: string;
  daysOfWeek?: string[];
  daysOfMonth?: string[];
  dates?: string[];
}
