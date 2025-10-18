/* eslint-disable no-unused-vars */

"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  Calendar,
  CheckCircle,
  Clock,
  MoreHorizontal,
  Trash2,
  XCircle,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EnrollmentItem } from "@/types/enrollment/response";

export const getStatusBadge = (status: string) => {
  switch (status) {
    case "approved":
      return (
        <Badge className="bg-green-100 text-green-800">Đã phê duyệt</Badge>
      );
    case "pending":
      return <Badge className="bg-yellow-100 text-yellow-800">Chờ duyệt</Badge>;
    case "rejected":
      return <Badge className="bg-red-100 text-red-800">Từ chối</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export const getStatusIcon = (status: string) => {
  switch (status) {
    case "approved":
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case "pending":
      return <Clock className="h-4 w-4 text-yellow-600" />;
    case "rejected":
      return <XCircle className="h-4 w-4 text-red-600" />;
    default:
      return null;
  }
};

interface CreateColumnsOptions {
  onApprove(id: number): void;
  onReject(id: number): void;
  onDelete(id: number): void;
}

export const createEnrollmentColumns = ({
  onApprove,
  onReject,
  onDelete,
}: CreateColumnsOptions): ColumnDef<EnrollmentItem>[] => {
  return [
    {
      accessorKey: "user",
      header: "Học sinh",
      cell: ({ row }) => {
        const user = row.original.user;
        if (!user || !user.fullName) {
          console.info("🚀 ~ createEnrollmentColumns ~ user:", user);
          return (
            <div className="text-muted-foreground text-sm">
              Người dùng không xác định
            </div>
          );
        }
        return (
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback>
                {user.fullName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{user.fullName}</div>
              <div className="text-muted-foreground text-sm">
                {user.internationalName || "Không có tên quốc tế"}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Trạng thái",
      cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          {getStatusIcon(row.original.status)}
          {getStatusBadge(row.original.status)}
        </div>
      ),
    },
    {
      accessorKey: "enrolledAt",
      header: "Ngày đăng ký",
      cell: ({ row }) => {
        const date = new Date(row.original.enrolledAt);
        return (
          <div className="flex items-center space-x-1">
            <Calendar className="text-muted-foreground h-4 w-4" />
            <span className="text-sm">
              {date.toLocaleDateString("vi-VN", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </span>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: () => <div className="text-right">Hành động</div>,
      cell: ({ row }) => {
        const enrollment = row.original;
        return (
          <div className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {enrollment.status === "pending" && (
                  <>
                    <DropdownMenuItem
                      className="text-green-600"
                      onClick={() => onApprove(enrollment.id)}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Phê duyệt
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => onReject(enrollment.id)}
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Từ chối
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={() => onDelete(enrollment.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Xóa
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
};
