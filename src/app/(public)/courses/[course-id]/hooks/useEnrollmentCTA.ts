import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { toast } from "sonner";

import { applyForEnrollment } from "@/apis/enrollment.api";
import { useAuth } from "@/contexts";
import { ApiError } from "@/types/api";
import { CourseItem } from "@/types/courses/response";
import { EnrollmentStatusEnum } from "@/types/enrollment/type";

import { useGetMyEnrollment } from "../../hooks/useGetMyEnrollment";

type UseEnrollmentCTAStateParams = {
  course: CourseItem;
};

export function useEnrollmentCTA({ course }: UseEnrollmentCTAStateParams) {
  const { isAuthenticated, user } = useAuth();
  // useMutation cho ghi danh
  const { mutateAsync: enroll, isPending: loading } = useMutation({
    mutationFn: async () => {
      return await applyForEnrollment({ courseId: course.id });
    },
    onSuccess: (data) => {
      if (data.status === EnrollmentStatusEnum.PENDING) {
        toast.success("Đã gửi yêu cầu ghi danh! Vui lòng chờ phê duyệt.");
        return;
      }
      toast.success("Đã ghi danh thành công!");
    },
    onError: (error: ApiError) => {
      if (error.status === 403) {
        const message = error.message || "Bạn đã ghi danh khóa học này rồi";
        toast.warning(message);
      } else {
        const message =
          error.responseData?.message ||
          error.message ||
          "Có lỗi xảy ra khi ghi danh";
        toast.error(message);
      }
      console.warn("Enrollment error:", error);
    },
  });
  const router = useRouter();

  // Lấy trạng thái ghi danh của user cho khóa học này
  const {
    data,
    isLoading: enrollmentLoading,
    isError: enrollmentError,
    refetch,
  } = useGetMyEnrollment({
    params: { courseId: course.id },
    enabled: isAuthenticated && !!user,
  });

  const buttonText = useMemo(() => {
    if (!isAuthenticated) return "Đăng nhập để ghi danh";
    if (loading) return "Đang ghi danh...";
    if (enrollmentLoading) return "Đang kiểm tra trạng thái...";
    if (enrollmentError) return "Ghi danh";

    // Nếu đã có enrollment
    if (data && data.enrollment) {
      switch (data.enrollment.status) {
        case EnrollmentStatusEnum.APPROVED:
          return "Đã ghi danh";
        case EnrollmentStatusEnum.PENDING:
          return "Chờ phê duyệt";
        case EnrollmentStatusEnum.REJECTED:
          return "Bị từ chối";
        default:
          return "Ghi danh";
      }
    }

    return "Ghi danh";
  }, [isAuthenticated, loading, enrollmentLoading, enrollmentError, data]);

  const handleClick = async () => {
    if (!isAuthenticated || !user) {
      router.push("/login");
      return;
    }
    await enroll();
    await refetch();
  };

  return { loading, buttonText, handleClick };
}
