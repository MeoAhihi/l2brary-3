"use client";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { DoorOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDeleteUser } from "@/hooks/users";

type OffboardButtonProps = {
  user: { id: string; fullName: string };
};

export function OffboardButton({ user }: OffboardButtonProps) {
  const router = useRouter();
  const deleteUser = useDeleteUser();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="destructive" className="w-full">
          <DoorOpen />
          Offboard
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có chắc chắn không?</AlertDialogTitle>
          <AlertDialogDescription>
            Hành động này rất khó để khôi phục và yêu cầu quyền Supper Admin.
            Hãy chắc rằng mọi người đồng thuận với việc Offboard của{" "}
            <span className="text-primary font-bold">{user.fullName}</span>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy bỏ</AlertDialogCancel>
          <AlertDialogAction
            onClick={() =>
              deleteUser.mutate(user.id, {
                onSuccess: () => router.refresh(),
              })
            }
          >
            Offboard
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
