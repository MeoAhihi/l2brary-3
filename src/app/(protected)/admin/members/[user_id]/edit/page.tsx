import { getMember } from "@/apis/iam.api";
import { MemberForm } from "@/components/member/member-form";
import PageHeader from "@/components/ui/page-header";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Edit Member | Admin | L2brary",
  description: "Edit member profile and information",
};

interface EditMemberPageProps {
  params: Promise<{
    user_id: string;
  }>;
}

export default async function EditMemberPage({ params }: EditMemberPageProps) {
  const { user_id } = await params;
  const user = await getMember(user_id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <PageHeader pageTitle={`Chỉnh sửa thành viên "${user.name}"`} />
        <p className="text-muted-foreground mb-8">User ID: {user_id}</p>

        {/* Member edit form will be implemented here */}
        <div className="space-y-6">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Edit Form</h3>
            <MemberForm defaultValues={user} />
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Rank Management</h3>
            <p className="text-sm text-muted-foreground">
              Rank and status management options will be implemented here
            </p>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Save Actions</h3>
            <p className="text-sm text-muted-foreground">
              Save and cancel buttons will be implemented here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
