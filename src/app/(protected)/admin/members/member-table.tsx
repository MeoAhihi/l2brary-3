"use client";

import { DataTable } from "@/components/ui/data-table/data-table";
import { DataTablePagination } from "@/components/ui/data-table/data-table-pagination";
import { Member } from "@/types/iam.types";

import { columns, TableHeader } from "./table.config";

interface MemberTableProps {
  members: Member[];
}

export default function MemberTable({ members }: MemberTableProps) {
  return (
    <DataTable
      columns={columns}
      data={members}
      header={(table) => <TableHeader table={table} />}
      footer={(table) => <DataTablePagination table={table} />}
    />
  );
}
