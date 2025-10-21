"use client";

import { useMemo } from "react";
import { StarIcon } from "lucide-react";
import { useParams } from "next/navigation";

import PageHeader from "@/components/ui/page-header";
import { ScoreProvider } from "@/contexts/score/ScoreContext";
import { useScoreColumns } from "@/hooks/score/use-score-column.queries";
import { useScoreTableQuery } from "@/hooks/score/use-score.queries";

import { ScoreRowWithId } from "./columns";
import ScoreTable from "./score-table";

export default function Page() {
  const params = useParams();
  const courseId = params["course-id"] as string;

  // Fetch score columns (for dynamic columns)
  const { data: scoreColumns, isLoading: isLoadingColumns } = useScoreColumns(
    courseId,
    { summarize: false },
  );

  // Fetch score table data
  const { data: apiScores, isLoading: isLoadingScores } =
    useScoreTableQuery(courseId);

  // Transform API data to add id field and calculate average if needed
  const scores: ScoreRowWithId[] = useMemo(() => {
    if (!apiScores) return [];

    return apiScores.map((row) => {
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
  }, [apiScores]);

  const isLoading = isLoadingColumns || isLoadingScores;

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-semibold">Đang tải dữ liệu...</div>
          <div className="text-muted-foreground text-sm">
            Vui lòng đợi trong giây lát
          </div>
        </div>
      </div>
    );
  }

  return (
    <ScoreProvider<ScoreRowWithId> initialScores={scores}>
      <div className="mb-4 flex items-center gap-3 rounded-lg bg-yellow-50 px-4 py-2">
        <StarIcon className="text-yellow-400" />
        <p className="font-semibold text-yellow-700">
          Coming Soon: Chức năng sẽ sớm có trong tương lai
        </p>
      </div>
      <PageHeader pageTitle="Bảng điểm" />
      <ScoreTable scoreColumns={scoreColumns || []} />
    </ScoreProvider>
  );
}
