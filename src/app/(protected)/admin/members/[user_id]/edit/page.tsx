import { Metadata } from "next";
import React from "react";

import { MemberForm } from "@/components/member/member-form";
import PageHeader from "@/components/ui/page-header";

export const metadata: Metadata = {
  title: "Edit Member | Admin | L2brary",
  description: "Edit member profile and information",
};

interface EditMemberPageProps {
  params: Promise<{
    user_id: string;
  }>;
}

export default function EditMemberPage({ params }: EditMemberPageProps) {
  const { user_id } = React.use(params);
  const user = {
    id: "28042003",
    name: "Lý Vĩ Phong",
    email: "phong.ly@example.com",
    phone: "+84 912 345 678",
    gender: "Nam",
    birthday: "2002-05-15",
    avatarUrl: "/image.png",
    role: "Thành viên",
    status: "Đang hoạt động",
    className: "11A15",
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <PageHeader pageTitle={`Chỉnh sửa thành viên "${user.name}"`} />
        <p className="text-muted-foreground mb-8">User ID: {user_id}</p>

        {/* Member edit form will be implemented here */}
        <div className="space-y-6">
          <div className="rounded-lg border p-6">
            <h3 className="mb-2 font-semibold">Edit Form</h3>
            <MemberForm defaultValues={user} />
          </div>

          <div className="rounded-lg border p-6">
            <h3 className="mb-2 font-semibold">Rank Management</h3>
            <p className="text-muted-foreground text-sm">
              Rank and status management options will be implemented here
            </p>
          </div>

          <div className="rounded-lg border p-6">
            <h3 className="mb-2 font-semibold">Save Actions</h3>
            <p className="text-muted-foreground text-sm">
              Save and cancel buttons will be implemented here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
