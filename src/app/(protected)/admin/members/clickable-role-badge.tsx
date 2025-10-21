"use client";

import { MinusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUnassignRole } from "@/hooks/users";

interface ClickableRoleBadgeProps {
  role: { id: string; name: string };
  userId: string;
}

export function ClickableRoleBadge({ role, userId }: ClickableRoleBadgeProps) {
  const unassignRole = useUnassignRole();
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Badge>{role.name}</Badge>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem
          onClick={() =>
            unassignRole.mutate(
              { id: userId, roleId: role.id },
              {
                onSuccess: () => {
                  toast.success("Bỏ gán vai trò thành công");
                  router.refresh();
                },
              },
            )
          }
        >
          <MinusCircle className="mr-2 h-4 w-4" />
          Bỏ gán vai trò
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
