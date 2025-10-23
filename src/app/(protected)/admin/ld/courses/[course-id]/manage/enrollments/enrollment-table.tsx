"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Search } from "lucide-react";

import { CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table/data-table";
import { DataTablePagination } from "@/components/ui/data-table/data-table-pagination";
import { Input } from "@/components/ui/input";
import { EnrollmentItem } from "@/types/enrollment/response";

interface EnrollmentTableProps {
  enrollments: EnrollmentItem[];
  columns: ColumnDef<EnrollmentItem>[];
  totalEnrollments: number;
  isLoading?: boolean;
  isFetching?: boolean;
  paginationProps: {
    initialPageIndex: number;
    initialPageSize: number;
    manualPagination: boolean;
    pageCount: number;
  };
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onSearch?: (query: string) => void;
}

export function EnrollmentTable({
  enrollments,
  columns,
  totalEnrollments,
  isLoading,
  isFetching,
  paginationProps,
  onPageChange,
  onPageSizeChange,
  onSearch,
}: EnrollmentTableProps) {
  return (
    <div className="flex flex-col gap-4">
      {(isLoading || isFetching) && (
        <p className="text-muted-foreground text-sm">
          Đang tải danh sách đăng ký...
        </p>
      )}

      <DataTable
        columns={columns}
        data={enrollments}
        {...paginationProps}
        header={(table) => (
          <div className="flex w-full flex-col gap-3 px-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <CardTitle>Danh sách học sinh</CardTitle>
              <p className="text-muted-foreground text-sm">
                {totalEnrollments && (
                  <>
                    Tổng cộng {totalEnrollments.toLocaleString("vi-VN")} đăng ký
                  </>
                )}
              </p>
            </div>
            <div className="flex w-full items-center gap-2 sm:w-auto">
              {/* <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Lọc
              </Button>
              <Button variant="outline" size="sm">
                <Mail className="mr-2 h-4 w-4" />
                Gửi email
              </Button> */}
              <div className="relative">
                <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
                <Input
                  placeholder="Tìm kiếm học sinh..."
                  className="w-full max-w-xs pl-8"
                  value={table.getState().globalFilter ?? ""}
                  onChange={(event) => {
                    table.setGlobalFilter(event.target.value);
                    onSearch?.(event.target.value);
                  }}
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>
        )}
        footer={(table) => (
          <DataTablePagination
            table={table}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
          />
        )}
      />
    </div>
  );
}
