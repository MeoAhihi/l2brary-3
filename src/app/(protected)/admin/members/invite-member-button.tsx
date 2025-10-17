"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useInviteUser } from "@/hooks/invite-code/use-invite";
import { Plus, PlusCircle, Send } from "lucide-react";
import { useState } from "react";

export function InviteMemberButton() {
  const inviteMember = useInviteUser();
  const [email, setEmail] = useState<string | undefined>(undefined);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          <Send />
          Tạo lời mời
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Tạo mã mời thành viên mới</DialogTitle>
          <DialogDescription>
            Nếu thành viên mới có email, bạn có thể nhập để gửi email.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Input
              id="link"
              placeholder="email nhận mã mời"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Đóng
            </Button>
          </DialogClose>
          <Button onClick={() => inviteMember.mutate(email)}>
            <PlusCircle />
            Tạo mã mời
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
