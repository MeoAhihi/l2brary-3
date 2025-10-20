import { upsertScores } from "@/apis/score.api";
import { UpsertScoreColumnPayload } from "@/types/score/score.payload.dto";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpsertScoresMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpsertScoreColumnPayload) => upsertScores(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["score-columns"] });
      toast.success("Cập nhật điểm thành công");
    },
    onError: () => {
      toast.error("Cập nhật điểm thất bại");
    },
  });
};
