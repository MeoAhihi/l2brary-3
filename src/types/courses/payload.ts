import { PaginationParams } from "@/shared";

import { ScheduleDetail, ScheduleTypeEnum } from "./type";

export interface CoursePayload {
  title: string;
  code: string;
  description: string;
  difficulty: string;
  isPublic: boolean;
  isRequireApproval: boolean;
  isAllowGuestAccess: boolean;
  thumbnail: string;
  maxStudents: number;
  enrollmentDeadlineDate: string;
  group: string;
  scheduleType: ScheduleTypeEnum;
  startDate: string;
  endDate: string;
  scheduleDetail: ScheduleDetail;
  chatGroupUrl: string;
}

export interface GetCoursePayload extends PaginationParams {
  title: string;
  group: string;
  scheduleType: ScheduleTypeEnum;
  isPublic?: boolean;
}
