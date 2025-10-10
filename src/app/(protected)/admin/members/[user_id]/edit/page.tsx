"use client";

import { Metadata } from "next";
import React from "react";

import { MemberForm } from "@/components/member/member-form";
import PageHeader from "@/components/ui/page-header";
import Head from "next/head";
import { useGetUserById } from "@/hooks/users";

interface EditMemberPageProps {
  params: Promise<{
    user_id: string;
  }>;
}

export default function EditMemberPage({ params }: EditMemberPageProps) {
  const { user_id } = React.use(params);
  const { data, isLoading, error } = useGetUserById(user_id);

  if (isLoading) return <div>Đang tải dữ liệu người dùng...</div>;
  if (error) return <div>Lỗi khi tải thông tin người dùng.</div>;
  const userInfo = data?.data;

  return (
    <>
      <Head>
        <title>Chỉnh sửa thành viên | Admin | L2brary</title>
        <meta
          name="description"
          content="Edit member profile and information"
        />
      </Head>
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <PageHeader
            pageTitle={`Chỉnh sửa thành viên "${userInfo!.fullName}"`}
          />
          <p className="text-muted-foreground mb-8">User ID: {user_id}</p>

          {/* Member edit form will be implemented here */}
          <div className="space-y-6">
            <div className="rounded-lg border p-6">
              <h3 className="mb-2 font-semibold">Edit Form</h3>
              <MemberForm defaultValues={userInfo} />
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
    </>
  );
}
