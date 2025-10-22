"use client";

import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import { useScoreContext } from "@/contexts/score/ScoreContext";
import { useUpsertScoresMutation } from "@/hooks/score/use-score.mutation";
import { useScoreTableQuery } from "@/hooks/score/use-score.queries";
import {
  UpsertScoreColumnPayload,
  UpsertScoreColumnRequest,
} from "@/types/score/score.payload.dto";
import { ScoreColumnItem } from "@/types/score/score-column.response.dto";

import { generateScoreColumns, ScoreRowWithId } from "./columns";

type ScoreTableProps = {
  scoreColumns: ScoreColumnItem[];
};

export default function ScoreTable({ scoreColumns }: ScoreTableProps) {
  const {
    scores,
    isEditScoreMode,
    setIsEditScoreMode,
    hasChanges,
    resetScores,
    originalScores,
    setScores,
  } = useScoreContext<ScoreRowWithId>();

  const [isSaving, setIsSaving] = useState(false);

  // Lấy courseId từ URL để refetch dữ liệu
  const params = useParams();
  const courseId = params["course-id"] as string;

  // Sử dụng courseId cho mutation và query
  const upsertScoresMutation = useUpsertScoresMutation(courseId);

  // Query để lấy dữ liệu và tự động cập nhật khi invalidated
  const { data: apiScores } = useScoreTableQuery(courseId);

  // Tự động cập nhật context khi apiScores thay đổi
  useEffect(() => {
    if (apiScores) {
      const updatedScores = apiScores.map((row) => {
        // Nếu API không trả về average, tính toán ở client
        let calculatedAverage = row.average;

        if (
          calculatedAverage === undefined &&
          row.scores &&
          row.scores.length > 0
        ) {
          const sum = row.scores.reduce((total, item) => total + item.score, 0);
          calculatedAverage = sum / row.scores.length;
        }

        return {
          ...row,
          id: row.user.id,
          average: calculatedAverage,
        };
      });

      // Chỉ cập nhật khi không ở chế độ edit để tránh ghi đè lên thay đổi người dùng
      if (!isEditScoreMode) {
        setScores(updatedScores);
      }
    }
  }, [apiScores, setScores, isEditScoreMode]);

  // Generate columns dynamically based on score columns
  const columns = useMemo(
    () => generateScoreColumns(scoreColumns),
    [scoreColumns],
  );

  const handleEdit = () => {
    setIsEditScoreMode(true);
  };

  // Hàm phụ trợ để tìm ra các thay đổi giữa scores hiện tại và scores gốc
  const getScoreChanges = () => {
    const changedColumns = new Set<number>();

    // Duyệt qua tất cả các scores để tìm ra các columns có thay đổi
    scores.forEach((row) => {
      const originalRow = originalScores.find((o) => o.id === row.id);
      if (!originalRow) return;

      row.scores.forEach((scoreItem) => {
        const originalScoreItem = originalRow.scores.find(
          (o) => o.scoreColumn.id === scoreItem.scoreColumn.id,
        );

        // Nếu score hiện tại khác với score gốc hoặc là score mới, thêm vào danh sách cần cập nhật
        if (!originalScoreItem || originalScoreItem.score !== scoreItem.score) {
          changedColumns.add(scoreItem.scoreColumn.id);
        }
      });
    });

    return Array.from(changedColumns);
  };

  const handleSave = async () => {
    if (!hasChanges) return;

    try {
      setIsSaving(true);

      // Lấy danh sách các columns có thay đổi
      const changedColumnIds = getScoreChanges();

      // Cho mỗi column có thay đổi, tạo một payload riêng và gửi API request
      const savePromises = changedColumnIds.map((columnId) => {
        // Tạo payload cho API theo định dạng yêu cầu
        const payload: UpsertScoreColumnPayload = {
          scoreColumnId: columnId,
          data: scores.map((row) => {
            // Tìm score cho column này của user hiện tại
            const scoreItem = row.scores.find(
              (s) => s.scoreColumn.id === columnId,
            );

            const request: UpsertScoreColumnRequest = {
              userId: row.id, // row.id chính là userId
              score: scoreItem?.score || 0,
            };

            return request;
          }),
        };

        // Gọi mutation để cập nhật scores
        return upsertScoresMutation.mutateAsync(payload);
      });

      // Đợi tất cả các request hoàn thành
      await Promise.all(savePromises);

      // Tắt chế độ chỉnh sửa - context sẽ tự động cập nhật thông qua useEffect
      // khi invalidateQueries gây ra refetch và cập nhật apiScores
      setIsEditScoreMode(false);
    } catch (error) {
      console.error("Error saving scores:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    resetScores();
  };

  return (
    <DataTable
      columns={columns}
      data={scores}
      header={() => (
        <div className="ml-auto space-x-2">
          {!isEditScoreMode ? (
            <Button onClick={handleEdit}>Chỉnh sửa</Button>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={handleCancel}
                disabled={isSaving}
              >
                Hủy
              </Button>
              <Button onClick={handleSave} disabled={!hasChanges || isSaving}>
                {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
              </Button>
            </>
          )}
        </div>
      )}
    />
  );
}
