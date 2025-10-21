"use client";

import { ColumnDef } from "@tanstack/react-table";

import { getRoles } from "@/apis/authorization.api";
import { Checkbox } from "@/components/ui/checkbox";
import {
  useAttachPermissionsMutation,
  useDetachPermissionsMutation,
} from "@/hooks/authorization/use-role-mutation";

// Component riêng để sử dụng hooks
function PermissionCheckbox({
  permissionId,
  roleId,
  checked,
}: {
  permissionId: string;
  roleId: string;
  checked: boolean;
}) {
  const attachPermission = useAttachPermissionsMutation();
  const detachPermission = useDetachPermissionsMutation();

  const handleClick = () => {
    if (checked) {
      detachPermission.mutate({
        roleId,
        data: { permissionIds: [permissionId] },
      });
    } else {
      attachPermission.mutate({
        roleId,
        data: { permissionIds: [permissionId] },
      });
    }
  };

  return <Checkbox checked={checked} onClick={handleClick} />;
}

const roles = await getRoles();
type RoleIds = (typeof roles)[number]["id"];
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
        return (
          <PermissionCheckbox
            permissionId={row.original.id}
            roleId={r.id}
            checked={row.original[r.id]}
          />
        );
      },
    })),
  ];
