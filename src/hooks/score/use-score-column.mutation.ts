import {
  createScoreColumn,
  deleteScoreColumn,
  updateScoreColumn,
} from "@/apis/score.api";
import { invalidateQueries } from "@/lib/query-client";
import { CreateScoreColumnDto } from "@/types/score/create-score-column.api.dto";
import { UpdateScoreColumnDto } from "@/types/score/update-score-column.api.dto";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateScoreColumnMutation = () => {
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
      invalidateQueries.scoreColumns();
      invalidateQueries.scoreTable(variables.courseId);
      toast.success("Tạo cột điểm thành công");
    },
    onError: () => {
      toast.error("Tạo cột điểm thất bại");
    },
  });
};

export const useUpdateScoreColumnMutation = () => {
  return useMutation({
    mutationFn: ({
      columnId,
      data,
    }: {
      columnId: string;
      data: UpdateScoreColumnDto;
    }) => updateScoreColumn(columnId, data),

    onSuccess: (data, variables) => {
      invalidateQueries.scoreColumns();
      invalidateQueries.scoreColumnDetails(variables.columnId);
      invalidateQueries.scoreTable();
      toast.success("Cập nhật cột điểm thành công");
    },
    onError: () => {
      toast.error("Cập nhật cột điểm thất bại");
    },
  });
};

export const useDeleteScoreColumnMutation = () => {
  return useMutation({
    mutationFn: (columnId: string) => deleteScoreColumn(columnId),

    onSuccess: () => {
      invalidateQueries.scoreColumns();
      invalidateQueries.scoreTable();
      toast.success("Xóa cột điểm thành công");
    },
    onError: () => {
      toast.error("Xóa cột điểm thất bại");
    },
  });
};
