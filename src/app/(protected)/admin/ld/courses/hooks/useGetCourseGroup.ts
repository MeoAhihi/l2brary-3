import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";

import { getCourseGroups } from "@/apis/course.api";
import { queryKeys } from "@/constants/query-keys";
import type { ApiError } from "@/types/api";

interface UseGetCourseGroupOptions {
  onError?: (error: Error) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccess?: (data: any) => void;
  retry?: boolean | number;
  showErrorToast?: boolean;
}

export const useGetCourseGroup = (options: UseGetCourseGroupOptions = {}) => {
  const { onError, onSuccess, showErrorToast = true } = options;

  const query = useQuery({
    queryKey: queryKeys.ld.courses,
    queryFn: getCourseGroups,
    refetchOnWindowFocus: false,
  });

  // Handle error with useEffect
  useEffect(() => {
    if (query.isError && query.error) {
      const apiError = query.error as unknown as ApiError;

      // Show error toast nếu enabled
      if (showErrorToast) {
        const message =
          apiError?.message || "Có lỗi xảy ra khi tải danh sách nhóm khóa học";
        toast.error(message);
      }

      // Call custom error handler
      onError?.(query.error);

      // Log error for debugging
      console.error("useGetCourseGroup error:", query.error);
    }
  }, [query.isError, query.error, showErrorToast, onError]);

  // Handle success with useEffect
  useEffect(() => {
    if (query.isSuccess && query.data) {
      onSuccess?.(query.data);
    }
  }, [query.isSuccess, query.data, onSuccess]);

  return {
    // Data states
    data: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,

    // Error states
    isError: query.isError,
    error: query.error as ApiError | null,

    // Status info
    status: query.status,
    failureCount: query.failureCount,
    failureReason: query.failureReason,

    // Actions
    refetch: query.refetch,

    // Utilities
    isSuccess: query.isSuccess,
  };
};
