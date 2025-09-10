"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Copy, MoreHorizontal, Settings, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { Course } from "@/types/ld.types";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "thumbnail",
    header: "Thumbnail",
    cell: ({ row }) => (
      <img
        src={row.original.thumbnail}
        alt={row.original.title}
        className="h-10 w-16 object-cover rounded"
      />
    ),
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <div className="flex flex-col gap-1">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="justify-start"
        >
          Tên khoá học
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => row.original.title,
    filterFn: "includesString",
  },
  {
    accessorKey: "classGroup",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lớp" />
    ),
    cell: ({ row }) => row.original.classGroup,
    filterFn: "equalsString",
  },
  {
    accessorKey: "recurrentRule",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lịch lặp lại" />
    ),
    cell: ({ row }) => row.original.recurrentRule,
    filterFn: "equalsString",
  },
  {
    accessorKey: "time",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Thời gian" />
    ),
    cell: ({ row }) => row.original.time,
    sortingFn: (rowA, rowB, columnId) => {
      // Sort by start time (assume format "HH:mm - HH:mm" or "HH:mm")
      const getStart = (val: string) => {
        const match = val.match(/^(\d{2}:\d{2})/);
        return match ? match[1] : val;
      };
      const a = getStart(rowA.getValue(columnId));
      const b = getStart(rowB.getValue(columnId));
      return a.localeCompare(b);
    },
  },
  {
    id: "actions",
    cell: function ActionsCell({ row }) {
      const course = row.original;
      const router = useRouter();

      // Helper to avoid lint warnings for unused callbacks
      // and to avoid inline functions in JSX
      const handleManage = () => {
        router.push(`/admin/ld/courses/${course.id}/manage`);
      };

      const handleSettings = () => {
        router.push(`/admin/ld/courses/${course.id}/manage/settings`);
      };

      const handleDelete = () => {
        // Confirm before delete
        // eslint-disable-next-line no-alert
        if (window.confirm("Bạn có chắc muốn xoá khoá học này?")) {
          // TODO: Implement delete logic
          toast("Đã xoá khoá học", {
            description: course.title,
          });
        }
      };

      const handleCopyId = () => {
        navigator.clipboard.writeText(course.id);
        toast("Đã sao chép ID khoá học", {
          description: course.id,
          action: {
            label: "OK",
            onClick: () => {},
          },
        });
      };

      const handleCopyZalo = () => {
        const zaloUrl = `https://zalo.me/${course.id}`;
        navigator.clipboard.writeText(zaloUrl);
        toast("Đã sao chép Zalo URL", {
          description: zaloUrl,
          action: {
            label: "OK",
            onClick: () => {},
          },
        });
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Hành động</DropdownMenuLabel>
            <DropdownMenuItem onClick={handleManage}>
              <span className="flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4" />
                Quản lý
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSettings}>
              <span className="flex items-center gap-2">
                <Settings />
                Cài đặt
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete}>
              <span className="flex items-center gap-2 text-destructive">
                <X />
                Xoá
              </span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleCopyId}>
              <span className="flex items-center gap-2">
                <Copy />
                Sao chép ID
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleCopyZalo}>
              <Image
                src="/Icon_of_Zalo.svg"
                alt="Zalo"
                width={15}
                height={15}
              />
              <span className="flex items-center gap-2">Sao chép Zalo URL</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
