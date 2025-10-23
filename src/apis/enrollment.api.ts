import axiosClient from "@/connectors/AxiosRestConnector";
import {
  ApplyEnrollmentPayload,
  GetEnrollmentsPayload,
  GetMyEnrollmentPayload,
  UpdateEnrollmentPayload,
} from "@/types/enrollment/payload";
import {
  EnrollmentItem,
  EnrollmentsResponse,
} from "@/types/enrollment/response";

/**
 * Đăng ký tham gia khóa học
 * @param payload Thông tin đăng ký (courseId)
 * @returns Thông tin enrollment đã tạo
 */
export const applyForEnrollment = async (payload: ApplyEnrollmentPayload) => {
  const { data } = await axiosClient.post("/enrollment", undefined, {
    params: payload,
  });
  return data;
};

/**
 * Lấy danh sách tất cả enrollments (Yêu cầu quyền admin)
 * @param params Tham số lọc (page, limit, courseId)
 * @returns Danh sách enrollments với phân trang
 */
export const getEnrollments = async (
  params?: GetEnrollmentsPayload,
): Promise<EnrollmentsResponse> => {
  const { data } = await axiosClient.get<EnrollmentsResponse>("/enrollment", {
    params,
  });

  return data;
};

/**
 * Lấy enrollment của người dùng hiện tại cho một khóa học cụ thể
 * @param params Query params chứa courseId (bắt buộc)
 * @returns Thông tin enrollment của user hiện tại
 */
export const getMyEnrollment = async (params: GetMyEnrollmentPayload) => {
  const { data } = await axiosClient.get("/enrollment/my", {
    params,
  });

  return data;
};

/**
 * Lấy thông tin enrollment theo ID (Yêu cầu quyền admin)
 * @param enrollmentId ID của enrollment
 * @returns Thông tin enrollment
 */
export const getEnrollmentById = async (
  enrollmentId: string,
): Promise<EnrollmentItem> => {
  const { data } = await axiosClient.get<EnrollmentItem>(
    `/enrollment/${enrollmentId}`,
  );

  return data;
};

/**
 * Cập nhật trạng thái enrollment (Yêu cầu quyền admin)
 * @param enrollmentId ID của enrollment cần cập nhật
 * @param payload Dữ liệu cập nhật (status)
 * @returns Thông tin enrollment đã được cập nhật
 */
export const updateEnrollment = async (
  enrollmentId: string,
  payload: UpdateEnrollmentPayload,
) => {
  const { data } = await axiosClient.patch(
    `/enrollment/${enrollmentId}`,
    payload,
  );

  return data;
};

/**
 * Xóa enrollment theo ID (Yêu cầu quyền admin)
 * @param enrollmentId ID của enrollment cần xóa
 * @returns Kết quả xóa
 */
export const deleteEnrollment = async (enrollmentId: string) => {
  const { data } = await axiosClient.delete(`/enrollment/${enrollmentId}`);

  return data;
};

/**
 * Lấy danh sách học viên của một khóa học (roster) (Yêu cầu quyền admin)
 * @param courseId ID của khóa học
 * @returns Danh sách học viên trong khóa học đó
 */
export const getEnrollmentRosterByCourseId = async (courseId: string) => {
  return await axiosClient.get<EnrollmentItem[]>(
    `/enrollment/course/${courseId}/roster`,
  );
};
