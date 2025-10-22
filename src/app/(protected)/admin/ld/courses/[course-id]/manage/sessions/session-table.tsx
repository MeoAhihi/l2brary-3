"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import { DataTablePagination } from "@/components/ui/data-table/data-table-pagination";
import { useSessionsQuery } from "@/hooks";

import { columns } from "./column";

export default function SessionsTable() {
  const { "course-id": courseId } = useParams<{ "course-id": string }>();
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, refetch, error } = useSessionsQuery({
    courseId: courseId ?? "",
    page,
    limit: 10,
  });

  if (isLoading)
    return (
      <div className="flex flex-col gap-4 pb-12">
        <p className="text-muted-foreground text-sm">
          Đang tải danh sách buổi học…
        </p>
      </div>
    );

  if (isError)
    return (
      <div className="flex flex-col gap-4 pb-12">
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
      </div>
    );

  return (
    <div className="flex flex-col gap-4 pb-12">
      <DataTable
        columns={columns}
        data={data?.items}
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
