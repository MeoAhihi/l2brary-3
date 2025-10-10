import { useMutation } from "@tanstack/react-query";

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
      // toast.success("Attendance marked successfully");
    },
    onError: (error) => {
      console.error("Failed to mark attendance:", error);
      // Error toast is handled by global mutation error handler
    },
  });
}
