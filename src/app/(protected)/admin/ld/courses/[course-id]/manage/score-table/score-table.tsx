"use client";

import { DataTable } from "@/components/ui/data-table/data-table";
import { columns, Score } from "./columns";

type ScoreTableProps = {
  scores: Score[];
};

export default function ScoreTable({ scores }: ScoreTableProps) {
  return (
    <DataTable
      columns={columns}
      data={scores}
      header={() => (
        <div>
          <h2>Bảng điểm</h2>
          <input type="text" placeholder="Họ và Tên" />
        </div>
      )}
    />
  );
}
