"use client";

import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUpdateUser } from "@/hooks/users";
import { GetOneUserResponse } from "@/types/user/get-one.api.dto";

export function ExperienceForm({ user }: { user: GetOneUserResponse }) {
  const userId = user.id;
  const items = user.experiences;
  const [value, setValue] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // handle logic here, e.g. send value somewhere or toast
  };
  const updateUser = useUpdateUser({
    onSuccess: () => {
      items?.push(value);
      setValue("");
    },
  });

  return (
    <>
      <h2 className="my-3 font-bold">Kinh nghiệm</h2>
      <div onSubmit={handleSubmit} className="flex items-center gap-2">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Thêm kinh nghiệm mới"
          className="max-w-xs"
        />
        <Button
          onClick={() =>
            updateUser.mutate({
              id: userId,
              data: { experiences: [...(items ?? []), value] },
            })
          }
        >
          Lưu
        </Button>
      </div>
      <div className="m-2 flex flex-row gap-2">
        {items && items.length > 0 ? (
          items.map((item) => <Badge key={item}>{item}</Badge>)
        ) : (
          <span className="text-gray-500">Chưa có thông tin</span>
        )}
      </div>
    </>
  );
}
