"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import { DataTablePagination } from "@/components/ui/data-table/data-table-pagination";
import { Input } from "@/components/ui/input";
import { Course } from "@/types/ld.types";

import { columns } from "./columns";

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
              className="focus:ring-primary rounded border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
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
