"use client";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table/data-table";
import type { ActivityType } from "./columns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type ActivityTableProps = {
  activities: ActivityType[];
  onActivitySelect?: (activity: ActivityType) => void;
  selectedActivityId?: string;
};

export default function ActivityTable({ activities, onActivitySelect, selectedActivityId }: ActivityTableProps) {
  return (
    <div className="w-full">
      <DataTable
        columns={columns}
        data={activities}
        onRowClick={onActivitySelect}
        selectedRowId={selectedActivityId}
        header={() => (
          <div className="flex flex-row justify-start">
            <h2 className="text-bold text-xl">Bảng Hoạt động</h2>
          </div>
        )}
      />
    </div>
  );
}
