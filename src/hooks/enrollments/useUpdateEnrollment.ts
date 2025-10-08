"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateEnrollment } from "@/apis/enrollment.api";
import { invalidateQueries } from "@/lib/query-client";
import type { UpdateEnrollmentPayload } from "@/types/enrollment/payload";

interface UseUpdateEnrollmentOptions {
  onSuccess?: () => void;
}

/**
 * Hook để cập nhật enrollment status (approve/reject)
 * @param options - Callback options
 * @returns Mutation object với updateEnrollment function
 */
export const useUpdateEnrollment = (options?: UseUpdateEnrollmentOptions) => {
  return useMutation({
    mutationFn: ({
      enrollmentId,
      payload,
    }: {
      enrollmentId: string;
      payload: UpdateEnrollmentPayload;
    }) => updateEnrollment(enrollmentId, payload),
    onSuccess: () => {
      // Invalidate enrollments query để refetch data
      invalidateQueries.enrollments();

      toast.success("Cập nhật enrollment thành công!");
      options?.onSuccess?.();
    },
    onError: (error: Error) => {
      toast.error(`Cập nhật thất bại: ${error.message}`);
    },
  });
};
