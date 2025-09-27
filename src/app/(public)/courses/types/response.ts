import { PaginatedResponse } from "../../../../types/api";
import { ScheduleDetail, ScheduleTypeEnum } from "./type";

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
  scheduleDetail: ScheduleDetail;
  chatGroupUrl: string;
  createdAt: string;
  updatedAt: string;
  isEnrollable?: boolean;
}

export type CoursesResponse = PaginatedResponse<CourseItem>;
