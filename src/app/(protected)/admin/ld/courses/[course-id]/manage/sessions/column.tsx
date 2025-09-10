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
import type { Session } from "@/types/ld.types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Copy, MoreHorizontal, Settings, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const columns: ColumnDef<Session>[] = [
  {
    id: "thumbnail",
    cell: ({ row }) => {
      const thumbnail = row.original.thumbnail;
      return (
        <div className="flex justify-center items-center w-12 h-12">
          {thumbnail ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={thumbnail}
              alt="Thumbnail"
              className="object-cover rounded w-10 h-10 border"
            />
          ) : (
            <div className="w-10 h-10 rounded bg-gray-200 flex items-center justify-center border">
              <svg
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
                className="text-gray-400"
              >
                <rect width="24" height="24" rx="4" fill="#e5e7eb" />
                <path
                  d="M8 13l2.5 3.5L15 11l4 6H5l3-4z"
                  stroke="#9ca3af"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </div>
          )}
        </div>
      );
    },
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Tiêu đề buổi học
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="font-medium">{row.original.title}</span>
    ),
    filterFn: "includesString",
  },
  {
    id: "day",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Ngày
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const start = row.original.startTime
        ? new Date(row.original.startTime)
        : null;
      return start
        ? start.toLocaleDateString("vi-VN", {
            weekday: "short",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
        : "";
    },
    sortingFn: (rowA, rowB) => {
      const a = rowA.original.startTime
        ? new Date(rowA.original.startTime).setHours(0, 0, 0, 0)
        : 0;
      const b = rowB.original.startTime
        ? new Date(rowB.original.startTime).setHours(0, 0, 0, 0)
        : 0;
      return a - b;
    },
  },
  {
    id: "startTime",
    header: ({ column }) => (
      <div className="text-center w-full">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="mx-auto"
        >
          Giờ bắt đầu
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const start = row.original.startTime
        ? new Date(row.original.startTime)
        : null;
      return (
        <div className="text-center w-full">
          {start
            ? start.toLocaleTimeString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
              })
            : ""}
        </div>
      );
    },
    sortingFn: (rowA, rowB) => {
      const a = rowA.original.startTime
        ? new Date(rowA.original.startTime).getTime()
        : 0;
      const b = rowB.original.startTime
        ? new Date(rowB.original.startTime).getTime()
        : 0;
      return a - b;
    },
  },
  {
    id: "endTime",
    header: ({ column }) => (
      <div className="text-center w-full">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="mx-auto"
        >
          Giờ kết thúc
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const end = row.original.endTime ? new Date(row.original.endTime) : null;
      return (
        <div className="text-center w-full">
          {end
            ? end.toLocaleTimeString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
              })
            : ""}
        </div>
      );
    },
    sortingFn: (rowA, rowB) => {
      const a = rowA.original.endTime
        ? new Date(rowA.original.endTime).getTime()
        : 0;
      const b = rowB.original.endTime
        ? new Date(rowB.original.endTime).getTime()
        : 0;
      return a - b;
    },
  },
  {
    accessorKey: "presenter",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Diễn giả
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) =>
      row.original.presenter || (
        <span className="italic text-muted-foreground">Chưa có</span>
      ),
    filterFn: "includesString",
  },
  {
    accessorKey: "attended",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Hiện diện
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-center w-full">{row.original.attended}</div>
    ),
    sortingFn: (rowA, rowB, columnId) => {
      const a = Number(rowA.getValue(columnId)) || 0;
      const b = Number(rowB.getValue(columnId)) || 0;
      return a - b;
    },
  },
  {
    id: "actions",
    cell: function ActionsCell({ row }) {
      const session = row.original;
      const router = useRouter();

      const handleDetail = () => {
        router.push(`/admin/ld/sessions/${session.id}/manage`);
      };

      const handleSettings = () => {
        router.push(`/admin/ld/sessions/${session.id}/manage/settings`);
      };

      const handleDelete = () => {
        if (window.confirm("Bạn có chắc muốn xoá buổi học này?")) {
          // TODO: Implement delete logic
          toast("Đã xoá buổi học", {
            description: session.title,
          });
        }
      };

      const handleCopyId = () => {
        navigator.clipboard.writeText(session.id ?? "");
        toast("Đã sao chép ID buổi học", {
          description: session.id,
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
            <DropdownMenuItem onClick={handleDetail}>
              <span className="flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4" />
                Chi tiết
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
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
