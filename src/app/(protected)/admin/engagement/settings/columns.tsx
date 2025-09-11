import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export type ActivityType = {
  id: string;
  name: string;
  engagementScore: number;
  category: string;
};

export const columns: ColumnDef<ActivityType>[] = [
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
    cell: () => (
      <Button
        variant="ghost"
        size="icon"
        aria-label="Remove"
        onClick={() => {
          // Implement remove logic here, e.g., call a prop or context
          // Example: onRemove(row.original.id)
        }}
      >
        <Trash2 className="w-4 h-4 text-destructive" />
      </Button>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
