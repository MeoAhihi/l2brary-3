"use client";

import { FormEventHandler } from "react";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import { DataTablePagination } from "@/components/ui/data-table/data-table-pagination";
import { Input } from "@/components/ui/input";

import { columns, Member } from "./columns";

type ManualCheckinMembersTableProps = {
  members: Member[];
};

const handleCheckin: FormEventHandler = (e) => {
  e.preventDefault(); /* handle submit here */
};

export default function ManualCheckinMembersTable({
  members,
}: ManualCheckinMembersTableProps) {
  return (
    <DataTable
      columns={columns}
      data={members}
      footer={(table) => (
        <div className="flex flex-col gap-4">
          <form
            className="flex flex-row items-center justify-between gap-2"
            onSubmit={handleCheckin}
          >
            <div className="text-muted-foreground text-sm">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <Input
              type="datetime-local"
              name="checkinTime"
              className="w-fit"
              defaultValue={new Date().toISOString().slice(0, 16)}
              aria-label="Check-in time"
            />
            <Button type="submit">Điểm danh</Button>
          </form>
          <DataTablePagination table={table} />
        </div>
      )}
    />
  );
}
