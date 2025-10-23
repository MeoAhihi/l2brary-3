"use client";

import { useParams } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDeleteEnrollment, useUpdateEnrollment } from "@/hooks/enrollments";
import type { EnrollmentItem } from "@/types/enrollment/response";
import { EnrollmentStatusEnum } from "@/types/enrollment/type";

import { createEnrollmentColumns } from "./columns";
import { EnrollmentTable } from "./enrollment-table";
import { useEnrollmentsTable } from "./hooks/useEnrollmentsTable";

export default function EnrollmentsPage() {
  const { "course-id": courseId } = useParams();

  // Mutations
  const { mutate: updateEnrollment } = useUpdateEnrollment();
  const { mutate: deleteEnrollment } = useDeleteEnrollment();

  // Create columns
  const columns = createEnrollmentColumns({
    onApprove: (enrollmentId: number) => {
      updateEnrollment({
        enrollmentId: enrollmentId.toString(),
        payload: { status: EnrollmentStatusEnum.APPROVED },
      });
    },
    onReject: (enrollmentId: number) => {
      updateEnrollment({
        enrollmentId: enrollmentId.toString(),
        payload: { status: EnrollmentStatusEnum.REJECTED },
      });
    },
    onDelete: (enrollmentId: number) => {
      if (confirm("Bạn có chắc chắn muốn xóa enrollment này?")) {
        deleteEnrollment(enrollmentId.toString());
      }
    },
  });

  // Sử dụng hook tổng hợp logic table
  const {
    enrollments,
    totalEnrollments,
    isLoading,
    isFetching,
    isError,
    paginationProps,
    handlePageChange,
    handlePageSizeChange,
  } = useEnrollmentsTable({
    courseId: courseId as string,
    defaultPageSize: 8, // hoặc ADMIN_COURSE_PAGE_SIZE nếu cần
  });

  // Calculate statistics
  const pendingCount = enrollments.filter(
    (e: EnrollmentItem) => e.status === EnrollmentStatusEnum.PENDING,
  ).length;
  const approvedCount = enrollments.filter(
    (e: EnrollmentItem) => e.status === EnrollmentStatusEnum.APPROVED,
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Đăng ký học</h2>
          <p className="text-muted-foreground">
            Quản lý đăng ký học và yêu cầu phê duyệt của học sinh
          </p>
        </div>
        {/* <Button>Xuất danh sách</Button> */}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Thống kê đăng ký</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {totalEnrollments}
              </div>
              <div className="text-muted-foreground text-sm">
                Tổng số đăng ký
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {pendingCount}
              </div>
              <div className="text-muted-foreground text-sm">Chờ phê duyệt</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {approvedCount}
              </div>
              <div className="text-muted-foreground text-sm">Đã phê duyệt</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">
                {totalEnrollments > 0
                  ? ((approvedCount / totalEnrollments) * 100).toFixed(1)
                  : 0}
                %
              </div>
              <div className="text-muted-foreground text-sm">
                Tỷ lệ phê duyệt
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          {isLoading ? (
            <div className="py-8 text-center">Đang tải đăng ký...</div>
          ) : isError ? (
            <div className="py-8 text-center text-red-600">Lỗi tải đăng ký</div>
          ) : (
            <EnrollmentTable
              enrollments={enrollments}
              columns={columns}
              totalEnrollments={totalEnrollments}
              isLoading={isLoading}
              isFetching={isFetching}
              paginationProps={paginationProps}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          )}
        </CardContent>
      </Card>

      {/* Student Performance Summary */}
      {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Điểm trung bình"
          value="B+"
          icon={<BookOpen className="text-muted-foreground h-4 w-4" />}
          description="+0.3 so với tuần trước"
        />
        <StatCard
          title="Tỷ lệ tham gia trung bình"
          value="87%"
          icon={<Calendar className="text-muted-foreground h-4 w-4" />}
          description="+2% so với tuần trước"
        />
        <StatCard
          title="Hoàn thành bài tập"
          value="73%"
          icon={<CheckCircle className="text-muted-foreground h-4 w-4" />}
          description="23 trên 32 bài tập"
        />
        <StatCard
          title="Học sinh hoạt động"
          value="89%"
          icon={<Users className="text-muted-foreground h-4 w-4" />}
          description="4 trên 6 học sinh hoạt động"
        />
      </div> */}
    </div>
  );
}
