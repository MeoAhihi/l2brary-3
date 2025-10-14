"use client";

import { useState } from "react";

import { DataTable } from "@/components/ui/data-table/data-table";
import { DataTablePagination } from "@/components/ui/data-table/data-table-pagination";
import { useGetAllUsers } from "@/hooks/users";
import { Member } from "@/types/member/response";

import { columns, TableHeader } from "./table.config";
import { useMemberTable } from "./use-member-table";

interface MemberTableProps {
  members: Member[];
}

export default function MemberTable() {
  const {
    members,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
    handlePageChange,
    handlePageSizeChange,
    paginationProps,
    totalMembers,
  } = useMemberTable();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <DataTable
      columns={columns}
      data={members}
      header={(table) => <TableHeader table={table} refetch={refetch} />}
      footer={(table) => (
        <DataTablePagination
          table={table}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      )}
    />
  );
}
