import {
  createScoreColumn,
  updateScoreColumn,
  deleteScoreColumn,
} from "@/apis/score.api";
import { CreateScoreColumnDto } from "@/types/score/create-score-column.api.dto";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { UpdateScoreColumnDto } from "@/types/score/update-score-column.api.dto";
import { queryKeys } from "@/constants/query-keys";

export const useCreateScoreColumnMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      courseId,
      data,
    }: {
      courseId: string;
      data: CreateScoreColumnDto;
    }) => createScoreColumn(courseId, data),

    onSuccess: (data, variables) => {
      // invalidate any relevant query keys so UI stays in sync
      queryClient.invalidateQueries({ queryKey: ["score-columns"] });
      toast.success("Tạo cột điểm thành công");
    },
    onError: (err) => {
      toast.error("Tạo cột điểm thất bại");
    },
  });
};

export const useUpdateScoreColumnMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      columnId,
      data,
    }: {
      columnId: string;
      data: UpdateScoreColumnDto;
    }) => updateScoreColumn(columnId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["score-columns"] });
      toast.success("Cập nhật cột điểm thành công");
    },
    onError: () => {
      toast.error("Cập nhật cột điểm thất bại");
    },
  });
};

export const useDeleteScoreColumnMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (columnId: string) => deleteScoreColumn(columnId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["score-columns"] });
      toast.success("Xóa cột điểm thành công");
    },
    onError: () => {
      toast.error("Xóa cột điểm thất bại");
    },
  });
};
