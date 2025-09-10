"use client";

import { Button } from "@/components/ui/button";
import { columns } from "./column";
import { DataTable } from "@/components/ui/data-table/data-table";
import { Session } from "@/types/ld.types";
import Link from "next/link";
import { DataTablePagination } from "@/components/ui/data-table/data-table-pagination";

export default function SessionsTable({ sessions }: { sessions: Session[] }) {
  return (
    <DataTable
      columns={columns}
      data={sessions}
      header={() => (
        <div className="flex flex-row justify-between">
          <h2 className="text-xl font-semibold">Danh sách các buổi học</h2>
          <Button>
            <Link href="/">Tạo mới</Link>
          </Button>
        </div>
      )}
      footer={(table) => <DataTablePagination table={table} />}
    />
  );
}
