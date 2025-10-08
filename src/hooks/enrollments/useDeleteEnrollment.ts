"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { deleteEnrollment } from "@/apis/enrollment.api";
import { invalidateQueries } from "@/lib/query-client";

interface UseDeleteEnrollmentOptions {
  onSuccess?: () => void;
}

/**
 * Hook để xóa enrollment
 * @param options - Callback options
 * @returns Mutation object với deleteEnrollment function
 */
export const useDeleteEnrollment = (options?: UseDeleteEnrollmentOptions) => {
  return useMutation({
    mutationFn: (enrollmentId: string) => deleteEnrollment(enrollmentId),
    onSuccess: () => {
      // Invalidate enrollments query để refetch data
      invalidateQueries.enrollments();

      toast.success("Đã xóa enrollment thành công!");
      options?.onSuccess?.();
    },
    onError: (error: Error) => {
      toast.error(`Xóa thất bại: ${error.message}`);
    },
  });
};
