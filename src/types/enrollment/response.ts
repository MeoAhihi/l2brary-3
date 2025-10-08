import { PaginatedResponse } from "@/types/api";

/**
 * Thông tin user trong enrollment (có thể null)
 */
export interface EnrollmentUser {
  id: string;
  name: string;
  email: string;
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
  status: "pending" | "approved" | "rejected";
  enrolledAt: string;
}

/**
 * Response trả về danh sách enrollments có phân trang
 */
export type EnrollmentsResponse = PaginatedResponse<EnrollmentItem>;
