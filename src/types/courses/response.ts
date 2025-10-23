import { PaginatedResponse } from "@/types/api";

import { CourseStatus, ScheduleDetail, ScheduleTypeEnum } from "./type";

export interface CourseItem {
  id: string;
  title: string;
  code: string;
  description: string;
  difficulty: string;
  isPublic: boolean;
  isRequireApproval: boolean;
  isAllowGuestAccess: boolean;
  thumbnail: string;
  maxStudents: number;
  enrollmentDeadline: string;
  group: string;
  scheduleType: ScheduleTypeEnum;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  scheduleDetail: ScheduleDetail;
  chatGroupUrl: string;
  createdAt: string;
  updatedAt: string;
  isEnrollable?: boolean;
  status: CourseStatus;
}

export type CoursesResponse = PaginatedResponse<CourseItem>;
