"use client";

import { getRoles } from "@/apis/authorization.api";
import { Checkbox } from "@/components/ui/checkbox";
import {
  useAttachPermissionsMutation,
  useDetachPermissionsMutation,
} from "@/hooks/authorization/use-role-mutation";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";

const roles = await getRoles();
const roleName = roles.map((r) => r.id);
type RoleIds = (typeof roleName)[number];
export const columns: ColumnDef<
  { id: string; name: string } & Record<RoleIds, boolean>
>[] =
  //& Record<Roles, boolean>
  [
    {
      accessorKey: "name",
      header: () => "",
      cell: ({ row }) => row.original.name,
    },
    ...roles.map<
      ColumnDef<{ id: string; name: string } & Record<RoleIds, boolean>>
    >((r) => ({
      accessorKey: r.id,
      header: () => r.name,
      cell: ({ row }) => {
        const attachPermission = useAttachPermissionsMutation();
        const detachPermission = useDetachPermissionsMutation();
        return (
          <Checkbox
            checked={row.original[r.id]}
            onClick={(e) => {
              const permId = row.original.id;
              const roleId = r.id;
              const checked = row.original[r.id];
              if (checked) {
                detachPermission.mutate({
                  roleId,
                  data: { permissionIds: [permId] },
                });
              } else {
                attachPermission.mutate({
                  roleId,
                  data: { permissionIds: [permId] },
                });
              }
            }}
          />
        );
      },
    })),
  ];
