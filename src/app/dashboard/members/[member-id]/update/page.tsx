"use client";
import React from "react";

import { MemberForm } from "@/components/member-form";
import { useParams } from "next/navigation";

import members from "@/constants/members.json";

export default function Page() {
  const memberId = useParams()["member-id"];
  const member = members.find((member) => member.id === memberId);
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="font-semibold text-2xl mb-5">
        Cập nhật thông tin của &quot;{member?.fullname}&quot;
      </h1>
      <MemberForm defaultValues={member} />
    </div>
  );
}
