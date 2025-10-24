"use client";

import { DataTable } from "@/components/ui/data-table/data-table";
import { Spinner } from "@/components/ui/spinner";

import { useSecurityData } from "./useSecurityData";

export const dynamic = "force-dynamic";

export default function SecurityPage() {
  const { data, columns, isLoading } = useSecurityData();

  if (isLoading) {
    return (
      <div className="flex min-h-56 w-full flex-col items-center justify-center gap-3">
        đang tải...
        <Spinner className="h-10 w-10" />
      </div>
    );
  }

  return (
    <div>
      <DataTable columns={columns} data={data} manualPagination />
    </div>
  );
}
