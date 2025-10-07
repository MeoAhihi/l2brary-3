"use client";

import { DataTable } from "@/components/ui/data-table/data-table";

import type { ActivityType } from "./columns";
import { getColumns } from "./columns";
import { table } from "console";
import { DataTablePagination } from "@/components/ui/data-table/data-table-pagination";

type ActivityTableProps = {
  activities: ActivityType[];
  onActivitySelect?: (activity: ActivityType) => void;
  selectedActivityId?: string;
  onDeleteActivity?: (id: string) => void;
};

export default function ActivityTable({
  activities,
  onActivitySelect,
  selectedActivityId,
  onDeleteActivity,
}: ActivityTableProps) {
  return (
    <div className="w-full">
      <DataTable
        columns={getColumns(onDeleteActivity)}
        data={activities}
        onRowClick={onActivitySelect}
        selectedRowId={selectedActivityId}
        header={() => (
          <div className="flex flex-row justify-start">
            <h2 className="text-bold text-xl">Bảng Hoạt động</h2>
          </div>
        )}
        footer={table => (
          <DataTablePagination table={table} />
        )}
      />
    </div>
  );
}
