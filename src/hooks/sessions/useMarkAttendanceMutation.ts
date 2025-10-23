import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { markAttendance } from "@/apis/session.api";
import { invalidateQueries } from "@/lib/query-client";
import type { MarkAttendanceDto } from "@/types/session/mark-attendance.api.dto";

interface MarkAttendancePayload {
  sessionId: string;
  attendanceData: MarkAttendanceDto;
}

export function useMarkAttendanceMutation() {
  return useMutation({
    mutationFn: ({ sessionId, attendanceData }: MarkAttendancePayload) =>
      markAttendance(sessionId, attendanceData),
    onSuccess: (data, variables: MarkAttendancePayload) => {
      // Invalidate session attendance data and session detail
      invalidateQueries.ld();

      // Show success toast
      toast.success("Điểm danh thành công");
    },
    onError: (error) => {
      console.error("Điểm danh thất bại:", error);
      // Error toast is handled by global mutation error handler
    },
  });
}
