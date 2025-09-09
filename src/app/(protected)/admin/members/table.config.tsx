"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ColumnDef, Table } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Plus } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Member } from "@/types/iam.types";

export const columns: ColumnDef<Member>[] = [
  {
    accessorKey: "fullname",
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
    cell: ({ row }) => {
      const fullname = row.original.fullname;
      return <a href={`#${fullname}`}> {fullname}</a>;
    },
  },
  {
    accessorKey: "international_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tên quốc tế
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const internationalName = row.original.international_name;
      return <a href={`#${internationalName}`}> {internationalName}</a>;
    },
  },
  {
    accessorKey: "is_male",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Giới tính
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return row.original.is_male ? "Nam" : "Nữ";
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Vai trò
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "birthday",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ngày sinh
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const birthday = row.original.birthday;
      // birthday is string in format YYYY-MM-DD or ISO, so parse to Date
      const date = new Date(birthday);
      return !isNaN(date.getTime())
        ? date.toLocaleDateString("en-GB")
        : birthday;
    },
  },
  { accessorKey: "phone_number", header: "Số điện thoại" },
  { accessorKey: "email", header: "Email" },
  {
    //Actions (edit, delete)
    id: "actions",
    cell: ({ row }) => {
      const members = row.original;
      const router = useRouter();
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(members.id);
                toast("Đã sao chép ID thành viên", {
                  description: members.id,
                  action: {
                    label: "OK",
                    onClick: () => {},
                  },
                });
              }}
            >
              Sao chép ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => router.push(`/admin/members/${members.id}`)}
            >
              Xem hồ sơ
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => router.push(`/admin/members/${members.id}/edit`)}
            >
              Chỉnh sửa
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                router.push(`/admin/members/${members.id}/engagement`)
              }
            >
              Xem hoạt động
            </DropdownMenuItem>
            <DropdownMenuItem>Chặn thành viên</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function TableHeader({ table }: { table: Table<Member> }) {
  const FILTER_COLUMN = "international_name";
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium">Danh sách Thành viên</h2>
        <Button asChild>
          <Link href="">
            <Plus />
            Tạo mới
          </Link>
        </Button>
      </div>
      <div className="flex items-center py-2">
        <Input
          placeholder="Tìm kiếm..."
          value={
            (table.getColumn(FILTER_COLUMN)?.getFilterValue() as string) ?? ""
          }
          onChange={(event) => {
            const searchValue = event.target.value;
            table.getColumn(FILTER_COLUMN)?.setFilterValue(searchValue);
          }}
          className="max-w-sm"
        />
      </div>
    </>
  );
}
