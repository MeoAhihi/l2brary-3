"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Copy, MoreHorizontal, Settings, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { SkeletonCell } from "@/components/ui/data-table/skeleton-cell";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTableSkeleton } from "@/hooks/table";
import { formatScheduleRule, formatTimeRange } from "@/lib/format";
import type { CourseItem } from "@/types/courses/response";

export const columns: ColumnDef<CourseItem>[] = [
  {
    accessorKey: "thumbnail",
    header: "Thumbnail",
    cell: ({ row }) => {
      return (
        <SkeletonCell
          item={row.original}
          skeletonHeight="h-10"
          skeletonWidth="w-16"
        >
          <Image
            src={row.original.thumbnail || "/default-thumbnail.svg"}
            alt={row.original.title}
            width={64}
            height={40}
            className="h-10 w-16 rounded object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (target.src !== "/images.png") {
                target.src = "/images.png";
              }
            }}
          />
        </SkeletonCell>
      );
    },
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
    cell: ({ row }) => (
      <SkeletonCell
        item={row.original}
        skeletonHeight="h-5"
        skeletonWidth="w-full"
      >
        <div className="font-medium">{row.original.title}</div>
      </SkeletonCell>
    ),
    filterFn: "includesString",
  },
  {
    accessorKey: "group",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nhóm" />
    ),
    cell: ({ row }) => (
      <SkeletonCell
        item={row.original}
        skeletonHeight="h-6"
        skeletonWidth="w-20"
      >
        <div className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
          {row.original.group}
        </div>
      </SkeletonCell>
    ),
    filterFn: "equalsString",
  },
  {
    id: "time",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Thời gian" />
    ),
    accessorFn: (course) => formatTimeRange(course),
    cell: ({ row }) => (
      <SkeletonCell
        item={row.original}
        skeletonHeight="h-4"
        skeletonWidth="w-32"
      >
        <span className="text-sm">{formatTimeRange(row.original)}</span>
      </SkeletonCell>
    ),
    sortingFn: (rowA, rowB, columnId) => {
      // Sort by start time (assume format "HH:mm - HH:mm" or "HH:mm")
      const getStart = (val: string) => {
        const match = val.match(/^(\d{2}:\d{2})/);
        return match ? match[1] : val;
      };
      const a = getStart(rowA.getValue<string>(columnId) ?? "");
      const b = getStart(rowB.getValue<string>(columnId) ?? "");
      return a.localeCompare(b);
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CourseActionsCell course={row.original} />,
  },
];

// Separate component for actions cell to use hooks
function CourseActionsCell({ course }: { course: CourseItem }) {
  const { isSkeletonItem } = useTableSkeleton();
  const router = useRouter();

  // Don't render actions for skeleton items
  if (isSkeletonItem(course)) {
    return null;
  }

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
    if (!course.chatGroupUrl) {
      toast("Không tìm thấy URL nhóm chat", {
        description: "Khoá học chưa được cấu hình đường dẫn Zalo",
      });
      return;
    }

    navigator.clipboard.writeText(course.chatGroupUrl);
    toast("Đã sao chép Zalo URL", {
      description: course.chatGroupUrl,
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
          <span className="text-destructive flex items-center gap-2">
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
          <Image src="/Icon_of_Zalo.svg" alt="Zalo" width={15} height={15} />
          <span className="flex items-center gap-2">Sao chép Zalo URL</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
