"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const scoreColumns = [
  "Stamp",
  "Điểm Nổ lực",
  "Điểm Soạn bài",
  "Điểm Tác phong",
  "Điểm thi",
];

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "avatarUrl",
    header: "",
    cell: ({ row }) => {
      return (
        <Avatar>
          <AvatarImage
            src={row.getValue("avatarUrl")}
            alt={`${row.getValue("fullName")}'s avatar`}
          />
          <AvatarFallback>{row.getValue("fullName")}</AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "fullName",
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
  ...scoreColumns.map((scoreColumn) => ({
    accessorKey: scoreColumn,
    header: ({ column }: any) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {scoreColumn}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  })),
];
