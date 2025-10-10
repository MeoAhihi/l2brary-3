"use client";

import { ColumnDef, Table } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Plus, PlusCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Member } from "@/types/member/response";
import { GetAllUserResponse, UsersItem } from "@/types/user/get-all.api.dto";
import { GENDER } from "@/constants/iam";
import { RefetchOptions, QueryObserverResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useState } from "react";
import InviteUserModal from "./invite-user-modal";

export const columns: ColumnDef<UsersItem>[] = [
  {
    accessorKey: "full_name",
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
      const fullname = row.original.fullName;
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
      const internationalName = row.original.internationalName;
      return <a href={`#${internationalName}`}> {internationalName}</a>;
    },
  },
  {
    accessorKey: "gender",
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
      switch (row.original.gender) {
        case GENDER.MALE:
          return "Nam";
        case GENDER.FEMALE:
          return "Nữ";
        default:
          return "Khác";
      }
    },
  },
  {
    accessorKey: "birthday",
    header: ({ column }) => {
      return "Ngày sinh";
    },
    cell: ({ row }) => {
      const birthday = row.original.birthdate;
      // birthday is string in format YYYY-MM-DD or ISO, so parse to Date
      const date = new Date(birthday);
      return !isNaN(date.getTime()) ? date.toLocaleDateString("en-GB") : "---";
    },
  },
  {
    accessorKey: "phone_number",
    header: "Số điện thoại",
    cell: ({ row }) => {
      const phone = row.original.phoneNumber || row.original.phoneNumber;
      return phone ? phone : "---";
    },
  },
  { accessorKey: "email", header: "Email" },
  {
    //Actions (edit, delete)
    accessorKey: "actions",
    cell: function ActionsCell({ row }) {
      const member = row.original;
      const router = useRouter();

      const handleCopyId = () => {
        navigator.clipboard.writeText(member.id);
        toast("Đã sao chép ID thành viên", {
          description: member.id,
          action: {
            label: "OK",
            onClick: () => {},
          },
        });
      };

      const handleViewProfile = () => {
        router.push(`/admin/members/${member.id}`);
      };

      const handleEdit = () => {
        router.push(`/admin/members/${member.id}/edit`);
      };

      const handleViewEngagement = () => {
        router.push(`/admin/members/${member.id}/engagement`);
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
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={handleCopyId}>
              Sao chép ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleViewProfile}>
              Xem hồ sơ
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleEdit}>Chỉnh sửa</DropdownMenuItem>
            <DropdownMenuItem onClick={handleViewEngagement}>
              Xem hoạt động
            </DropdownMenuItem>
            <DropdownMenuItem>Chặn thành viên</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function TableHeader({
  table,
  refetch,
}: {
  table: Table<UsersItem>;
  refetch: (
    options?: RefetchOptions,
  ) => Promise<
    QueryObserverResult<AxiosResponse<GetAllUserResponse, any>, Error>
  >;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex w-full flex-col gap-3 px-2 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Danh sách thành viên</h2>
        {/* <div className="flex w-full items-center gap-2 sm:w-auto">
          <Input
            type="search"
            placeholder="Tìm kiếm thành viên..."
            aria-label="Tìm kiếm thành viên"
            className="focus:ring-primary w-full max-w-xs rounded border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
            value={
              (table.getColumn("full_name")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("full_name")?.setFilterValue(event.target.value)
            }
          />
        </div> */}
      </div>
      {/*
        Implement InviteUserModal and show it when the button is clicked
      */}
      {(() => {
        return (
          <>
            <Button onClick={() => setOpen(true)}>
              <PlusCircle />
              Mời thành viên mới
            </Button>
            <InviteUserModal open={open} onOpenChange={() => setOpen(!open)} />
          </>
        );
      })()}
    </div>
  );
}
