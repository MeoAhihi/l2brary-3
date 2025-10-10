"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import { DataTablePagination } from "@/components/ui/data-table/data-table-pagination";
import { Session } from "@/types/ld.types";

import { columns } from "./column";

import { useParams } from "next/navigation";
import { useSessionTable } from "./use-session-table";

export default function SessionsTable() {
  const params = useParams();
  const courseId =
    typeof params["course-id"] === "string"
      ? params["course-id"]
      : Array.isArray(params["course-id"])
        ? params["course-id"][0]
        : "";
  const {
    sessions,
    totalSessions,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
    handlePageChange,
    handlePageSizeChange,
    paginationProps,
    isSkeletonMode,
  } = useSessionTable({ courseId });

  return (
    <div className="flex flex-col gap-4 pb-12">
      {(isLoading || isFetching) && !isSkeletonMode && (
        <p className="text-muted-foreground text-sm">
          Đang tải danh sách buổi học…
        </p>
      )}

      {isError && error && (
        <div className="border-destructive/30 bg-destructive/5 rounded-md border p-4 text-sm">
          <p className="text-destructive font-semibold">
            Không thể tải danh sách buổi học
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
        data={sessions as any}
        {...paginationProps}
        header={() => (
          <div className="flex flex-row justify-between">
            <h2 className="text-xl font-semibold">Danh sách các buổi học</h2>
            <Button>
              <Link href={`/admin/ld/courses/${courseId}/manage/sessions/new`}>
                Tạo mới
              </Link>
            </Button>
          </div>
        )}
        footer={(table) => <DataTablePagination table={table} />}
      />
    </div>
  );
}
