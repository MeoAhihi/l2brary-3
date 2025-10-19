"use client";

import { DataTable } from "@/components/ui/data-table/data-table";
import { Spinner } from "@/components/ui/spinner";
import {
  useGetAllRolesQuery,
  usePermissionsQuery,
} from "@/hooks/authorization/use-role-query";
import React from "react";
import { columns } from "./columns";

function SecurityPage() {
  const { data: roles, isLoading: isLoadingRoles } = useGetAllRolesQuery({
    permissions: true,
  });
  const { data: permissions, isLoading: isLoadingPermissions } =
    usePermissionsQuery({ attachRoles: true });
  if (isLoadingRoles || isLoadingPermissions)
    return (
      <div className="flex min-h-56 w-full flex-col items-center justify-center gap-3">
        Đang tải...
        <Spinner className="h-10 w-10" />
      </div>
    );
  const data = permissions
    .map((p) => ({
      id: p.id,
      name: p.name,
      ...roles
        .map((r) => ({
          key: r.id,
          value: p.roles?.map((role) => role.id).includes(r.id),
        }))
        .reduce((acc, cur) => ({ ...acc, [cur.key]: cur.value }), {}),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
  return (
    <div>
      <DataTable columns={columns as any} data={data} manualPagination />
    </div>
  );
}

export default SecurityPage;
