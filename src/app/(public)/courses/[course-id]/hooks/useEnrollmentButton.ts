import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { applyForEnrollment } from "@/apis/enrollment.api";
import { useAuth } from "@/contexts";
import { CourseItem } from "@/types/courses/response";

type UseEnrollmentCTAStateParams = {
  course: CourseItem;
};

export function useEnrollmentButton({ course }: UseEnrollmentCTAStateParams) {
  const { isAuthenticated, user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const label = useMemo(() => {
    if (!isAuthenticated) return "Đăng nhập để ghi danh";

    if (loading) return "Đang ghi danh...";

    if (course.isRequireApproval) return "Chờ phê duyệt";

    return "Ghi danh";
  }, [isAuthenticated, loading, course.isRequireApproval]);

  const handleClick = async () => {
    if (!isAuthenticated || !user) {
      router.push("/login");
      return;
    }

    setLoading(true);
    try {
      await applyForEnrollment({
        courseId: course.id,
        userId: user.id,
      });

      toast.success("Đã gửi yêu cầu ghi danh! Vui lòng chờ phê duyệt.");

      toast.success("Đã ghi danh thành công!");
    } catch (error: any) {
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

      // Vẫn log lỗi để debug (nhưng không hiện ra console chính)
      console.warn("Enrollment error:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, label, handleClick };
}
