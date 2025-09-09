"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import { Input } from "@/components/ui/input";
import { Course } from "@/types/ld.types";
import Link from "next/link";
import { columns } from "./columns";
import { DataTablePagination } from "@/components/ui/data-table/data-table-pagination";

type CoursesTableProps = {
  courses: Course[];
};

export function CoursesTable({ courses }: CoursesTableProps) {
  return (
    <DataTable
      columns={columns}
      data={courses}
      header={(table) => (
        <div className="flex flex-col gap-2 px-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex">
            <h2 className="text-lg font-semibold">Danh sách khoá học</h2>
            <Input
              type="text"
              placeholder="Tìm kiếm khoá học..."
              className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={table.getState().globalFilter ?? ""}
              onChange={(e) => table.setGlobalFilter(e.target.value)}
            />
          </div>
          <Button asChild>
            <Link href="/admin/ld/courses/new">Tạo khoá học mới</Link>
          </Button>
        </div>
      )}
      footer={(table) => <DataTablePagination table={table} />}
    />
  );
}
