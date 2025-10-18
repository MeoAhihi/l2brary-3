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

export const WeekDayMap: Record<WeekTypeEnum, number> = {
  [WeekTypeEnum.SUNDAY]: 0,
  [WeekTypeEnum.MONDAY]: 1,
  [WeekTypeEnum.TUESDAY]: 2,
  [WeekTypeEnum.WEDNESDAY]: 3,
  [WeekTypeEnum.THURSDAY]: 4,
  [WeekTypeEnum.FRIDAY]: 5,
  [WeekTypeEnum.SATURDAY]: 6,
};

export enum ScheduleTypeEnum {
  Weekly = "WEEKLY",
  Monthly = "MONTHLY",
  LunarMonthly = "LUNAR_MONTHLY",
  OneTime = "ONE_TIME",
  BiWeekly = "BIWEEKLY",
}

export interface ScheduleDetail {
  time?: string;
  daysOfWeek?: string[];
  daysOfMonth?: string[];
  dates?: string[];
}
