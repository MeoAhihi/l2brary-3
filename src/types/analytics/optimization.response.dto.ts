export type GetEnrollmentByCourseIListItem = {
  courseTitle: string;
  courseCode: string;
  courseId: string;
  enrollmentCount: string;
};

export type GetEnrollmentByCourseResponse = GetEnrollmentByCourseIListItem[];

export type getAverageAttendanceByCourse = Record<string, number>;

export type getTopUserByActivityListItem = {
  userId: string;
  name: string;
  point: number;
};

export type getTopUserByActivityListResponse = getTopUserByActivityListItem[];
