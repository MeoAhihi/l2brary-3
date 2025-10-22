"use client";

import { UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
import { useGetAllRolesQuery } from "@/hooks/authorization/use-role-query";
import { useAssignRole } from "@/hooks/users";
import { Role } from "@/types/auth/iam.response";

interface AssignRoleBadgeProps {
  user: { id: string; roles: Role[] };
}

export function AssignRoleBadge({ user }: AssignRoleBadgeProps) {
  const assignRole = useAssignRole();
  const { data: roles, isLoading } = useGetAllRolesQuery();
  const router = useRouter();

  if (isLoading)
    return (
      <Badge variant="outline">
        <Spinner />
      </Badge>
    );

  const availableRoles = roles.filter(
    (r) => !user.roles.map((role) => role.id).includes(r.id),
  );

  if (!availableRoles.length) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Badge
          variant="outline"
          className="flex cursor-pointer items-center justify-center gap-1"
        >
          <UserPlus className="h-4 w-4" />
        </Badge>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {availableRoles.map((role) => (
          <DropdownMenuItem
            key={role.id}
            disabled={assignRole.isPending}
            onClick={() => {
              assignRole.mutate(
                { id: user.id, roleId: role.id },
                {
                  onSuccess: () => {
                    router.refresh();
                  },
                },
              );
            }}
          >
            {assignRole.isPending && <Spinner />}
            {role.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
