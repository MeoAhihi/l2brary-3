import { PaginatedResponse } from "@/types/api";

import { EnrollmentStatusEnum } from "./type";

/**
 * Thông tin user trong enrollment (có thể null)
 */
export interface EnrollmentUser {
  id: string;
  fullName: string;
  internationalName: string;
}

/**
 * Thông tin course trong enrollment
 */
export interface EnrollmentCourse {
  id: string;
  title: string;
  code: string;
}

/**
 * Enrollment item với thông tin đầy đủ
 */
export interface EnrollmentItem {
  id: number;
  user: EnrollmentUser | null;
  course: EnrollmentCourse;
  status: EnrollmentStatusEnum;
  enrolledAt: string;
}

/**
 * Response trả về danh sách enrollments có phân trang
 */
export type EnrollmentsResponse = PaginatedResponse<EnrollmentItem>;
