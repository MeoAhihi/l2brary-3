"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import {
  useAttachPermissionsMutation,
  useDetachPermissionsMutation,
} from "@/hooks/authorization/use-role-mutation";
import { RefRoleDto } from "@/types/authorization/ref-role.dto";

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

// Function để generate columns dynamically dựa trên roles
export const createColumns = (
  roles: RefRoleDto[],
): ColumnDef<{ id: string; name: string } & Record<string, boolean>>[] => [
  {
    accessorKey: "name",
    header: () => "",
    cell: ({ row }) => row.original.name,
  },
  // {
  //   accessorKey: "5361c117-b4d1-41f3-951f-6fbbc681f5de",
  //   header: "Thành viên",
  //   cell: ({ row }) => {
  //     return (
  //       <PermissionCheckbox
  //         permissionId={row.original.id}
  //         roleId="5361c117-b4d1-41f3-951f-6fbbc681f5de"
  //         checked={
  //           row.original["5361c117-b4d1-41f3-951f-6fbbc681f5de"] as boolean
  //         }
  //       />
  //     );
  //   },
  // },
  // {
  //   accessorKey: "764a95e4-a113-4936-8e9e-b22c193a60ba",
  //   header: "Giám sát viên",
  //   cell: ({ row }) => {
  //     return (
  //       <PermissionCheckbox
  //         permissionId={row.original.id}
  //         roleId="764a95e4-a113-4936-8e9e-b22c193a60ba"
  //         checked={
  //           row.original["764a95e4-a113-4936-8e9e-b22c193a60ba"] as boolean
  //         }
  //       />
  //     );
  //   },
  // },
  // {
  //   accessorKey: "0408573c-7ce5-428a-aba3-74819e3a9342",
  //   header: "Ban điều hành",
  //   cell: ({ row }) => {
  //     return (
  //       <PermissionCheckbox
  //         permissionId={row.original.id}
  //         roleId="0408573c-7ce5-428a-aba3-74819e3a9342"
  //         checked={
  //           row.original["0408573c-7ce5-428a-aba3-74819e3a9342"] as boolean
  //         }
  //       />
  //     );
  //   },
  // },
];
