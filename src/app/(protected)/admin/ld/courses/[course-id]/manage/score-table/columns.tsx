"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useScoreContext } from "@/contexts/score/ScoreContext";
import { ScoreTableRow } from "@/types/score/score.response.dto";
import { ScoreColumnItem } from "@/types/score/score-column.response.dto";

// Extend ScoreTableRow với id và index signature để satisfy ScoreData constraint
export type ScoreRowWithId = ScoreTableRow & {
  id: string;
  [key: string]: unknown;
};

// Component riêng cho score cell để có access vào context
function ScoreCell({ row, columnId }: { row: any; columnId: number }) {
  console.info("🚀 ~ ScoreCell ~ row:", row);
  const { isEditScoreMode, updateScore } = useScoreContext<ScoreRowWithId>();

  // Find score value từ scores array based on scoreColumn.id
  const scoreItem = row.original.scores?.find(
    (s: any) => s.scoreColumn.id === columnId,
  );
  const value = scoreItem?.score ?? 0;

  const handleScoreChange = (newValue: number) => {
    const currentScores = row.original.scores || [];

    // Check if score exists for this column
    const scoreExists = currentScores.some(
      (s: any) => s.scoreColumn.id === columnId,
    );

    let updatedScores;

    if (scoreExists) {
      // Update existing score
      updatedScores = currentScores.map((s: any) =>
        s.scoreColumn.id === columnId ? { ...s, score: newValue } : s,
      );
    } else {
      // Add new score
      updatedScores = [
        ...currentScores,
        {
          score: newValue,
          scoreColumn: { id: columnId },
        },
      ];
    }

    updateScore(row.original.id, {
      scores: updatedScores,
    } as Partial<ScoreRowWithId>);
  };

  if (!isEditScoreMode) {
    return <span>{value}</span>;
  }

  return (
    <Input
      type="number"
      value={value}
      onChange={(e) => {
        const newValue = parseFloat(e.target.value) || 0;
        handleScoreChange(newValue);
      }}
      className="w-20"
      min={0}
      max={100}
    />
  );
}

/**
 * Generate dynamic columns based on score columns from API
 */
export function generateScoreColumns(
  scoreColumns: ScoreColumnItem[],
): ColumnDef<ScoreRowWithId>[] {
  return [
    // Fixed column: User fullName
    {
      accessorKey: "user.fullName",
      id: "fullName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Họ và tên
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },

    // Dynamic score columns
    ...scoreColumns.map((scoreColumn) => ({
      id: `score-${scoreColumn.id}`,
      accessorFn: (row: ScoreRowWithId) => {
        // Extract score value từ scores array
        const scoreItem = row.scores?.find(
          (s: any) => s.scoreColumn.id === scoreColumn.id,
        );
        return scoreItem?.score ?? 0;
      },
      header: ({ column }: any) => {
        return (
          <Button
            variant="ghost"
            className="!px-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {scoreColumn.name}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }: any) => {
        return <ScoreCell row={row} columnId={scoreColumn.id} />;
      },
    })),

    // Average column (optional)
    {
      accessorKey: "average",
      id: "average",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Trung bình
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const avg = row.getValue("average") as number | undefined;
        return <span>{avg?.toFixed(2) ?? "-"}</span>;
      },
    },
  ];
}
