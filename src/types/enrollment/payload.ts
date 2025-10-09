import { EnrollmentStatusEnum } from "./type";

export interface ApplyEnrollmentPayload {
  courseId: string;
}

export interface GetEnrollmentsPayload {
  page?: number;
  limit?: number;
  courseId?: string;
}

export interface GetMyEnrollmentPayload {
  courseId: string;
}

export interface UpdateEnrollmentPayload {
  status: EnrollmentStatusEnum;
}
