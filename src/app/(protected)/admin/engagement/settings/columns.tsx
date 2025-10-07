import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export type ActivityType = {
  id: string;
  name: string;
  engagementScore: number;
  category: string;
};

export const getColumns = (
  onDelete?: (id: string) => void,
): ColumnDef<ActivityType>[] => [
  {
    accessorKey: "name",
    header: "Tên Hoạt động",
    cell: ({ row }) => <span>{row.getValue("name")}</span>,
  },
  {
    accessorKey: "engagementScore",
    header: "Điểm Tương tác",
    cell: ({ row }) => <span>{row.getValue("engagementScore")}</span>,
  },
  {
    accessorKey: "category",
    header: "Phân loại",
    cell: ({ row }) => <span>{row.getValue("category")}</span>,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <Button
        variant="ghost"
        size="icon"
        aria-label="Remove"
        onClick={(e) => {
          e.stopPropagation();
          const original = row.original as ActivityType;
          onDelete?.(original.id);
        }}
      >
        <Trash2 className="text-destructive h-4 w-4" />
      </Button>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
