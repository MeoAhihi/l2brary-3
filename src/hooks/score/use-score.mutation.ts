import { upsertScores } from "@/apis/score.api";
import { invalidateQueries } from "@/lib/query-client";
import { UpsertScoreColumnPayload } from "@/types/score/score.payload.dto";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpsertScoresMutation = (courseId?: string) => {
  return useMutation({
    mutationFn: (payload: UpsertScoreColumnPayload) => upsertScores(payload),
    onSuccess: () => {
      invalidateQueries.scoreColumns();
      // Invalidate với courseId nếu có
      if (courseId) {
        invalidateQueries.scoreTable(courseId);
      } else {
        invalidateQueries.scoreTable();
      }
      toast.success("Cập nhật điểm thành công");
    },
    onError: () => {
      toast.error("Cập nhật điểm thất bại");
    },
  });
};
