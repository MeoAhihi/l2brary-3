/* eslint-disable no-unused-vars */

export enum ScheduleTypeEnum {
  Weekly = "WEEKLY",
  Monthly = "MONTHLY",
  LunarMonthly = "LUNAR_MONTHLY",
  OneTime = "ONE_TIME",
}

export interface ScheduleDetail {
  time: string;
  daysOfWeek?: string[];
  daysOfMonth?: number[];
}
