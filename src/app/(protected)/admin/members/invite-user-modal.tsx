"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useInviteUser } from "@/hooks/invite-code/use-invite";

interface InviteUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function InviteUserModal({
  open,
  onOpenChange,
}: InviteUserModalProps) {
  const inviteUserMutation = useInviteUser();
  const [email, setEmail] = React.useState("");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mời thành viên mới</DialogTitle>
          <DialogDescription>
            Nhập thông tin thành viên mới để gửi lời mời tham gia câu lạc bộ.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // Gửi lời mời - sẽ triển khai sau
            }}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="invite-email"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Email thành viên
              </label>
              <input
                id="invite-email"
                name="email"
                type="email"
                required
                placeholder="nhap.email@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="focus:ring-primary block w-full rounded border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
              />
            </div>
          </form>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Đóng
          </Button>
          <Button
            type="submit"
            form="invite-form"
            onClick={() => {
              inviteUserMutation.mutate(email);
              onOpenChange(false);
            }}
          >
            Gửi lời mời
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
