"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import { DataTablePagination } from "@/components/ui/data-table/data-table-pagination";
import { Input } from "@/components/ui/input";
import { useCoursesTable } from "@/hooks/courses";

import { columns } from "./columns";

export function CoursesTable() {
  const {
    courses,
    totalCourses,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
    handlePageChange,
    handlePageSizeChange,
    paginationProps,
    isSkeletonMode,
  } = useCoursesTable();

  return (
    <div className="flex flex-col gap-4">
      {(isLoading || isFetching) && !isSkeletonMode && (
        <p className="text-muted-foreground text-sm">
          Đang tải danh sách khoá học…
        </p>
      )}

      {isError && error && (
        <div className="border-destructive/30 bg-destructive/5 rounded-md border p-4 text-sm">
          <p className="text-destructive font-semibold">
            Không thể tải danh sách khoá học
          </p>
          <p className="text-destructive/80 mt-1">
            {error?.message ?? "Vui lòng thử lại sau."}
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-3 w-fit"
            onClick={() => refetch()}
          >
            Thử lại
          </Button>
        </div>
      )}

      <DataTable
        columns={columns}
        data={courses}
        {...paginationProps}
        header={(table) => (
          <div className="flex w-full flex-col gap-3 px-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold">Danh sách khoá học</h2>
              <p className="text-muted-foreground text-sm">
                {totalCourses && (
                  <>Tổng cộng {totalCourses.toLocaleString("vi-VN")} khoá học</>
                )}
              </p>
            </div>
            <div className="flex w-full items-center gap-2 sm:w-auto">
              <Input
                type="search"
                placeholder="Tìm kiếm khoá học..."
                aria-label="Tìm kiếm khoá học"
                className="focus:ring-primary w-full max-w-xs rounded border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
                value={table.getState().globalFilter ?? ""}
                onChange={(event) => table.setGlobalFilter(event.target.value)}
                disabled={isLoading}
              />
              <Button asChild>
                <Link href="/admin/ld/courses/new">Tạo khoá học mới</Link>
              </Button>
            </div>
          </div>
        )}
        footer={(table) => (
          <DataTablePagination
            table={table}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        )}
      />
    </div>
  );
}
