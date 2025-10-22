"use client";

import { useMemo } from "react";

import {
  useGetAllRolesQuery,
  usePermissionsQuery,
} from "@/hooks/authorization/use-role-query";

import { createColumns } from "./columns";

export function useSecurityData() {
  const rolesQuery = useGetAllRolesQuery(
    { permissions: true },
    {
      // Tắt tất cả auto-refetch để tránh trigger trong SSR
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  );

  const permissionsQuery = usePermissionsQuery(
    { attachRoles: true },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  );

  const roles = useMemo(() => rolesQuery.data || [], [rolesQuery.data]);
  const permissions = useMemo(
    () => permissionsQuery.data || [],
    [permissionsQuery.data],
  );

  // Tạo columns dynamically từ roles data
  const columns = useMemo(() => createColumns(roles), [roles]);

  const data = useMemo(
    () =>
      permissions
        .map((p: any) => ({
          id: p.id,
          name: p.name,
          ...roles
            .map((r: any) => ({
              key: r.id,
              value: p.roles?.map((role: any) => role.id).includes(r.id),
            }))
            .reduce(
              (acc: any, cur: any) => ({ ...acc, [cur.key]: cur.value }),
              {},
            ),
        }))
        .sort((a: any, b: any) => a.name.localeCompare(b.name)),
    [permissions, roles],
  );

  return {
    data,
    columns,
    isLoading: rolesQuery.isLoading || permissionsQuery.isLoading,
  };
}
