"use client";

import Head from "next/head";

import PageHeader from "@/components/ui/page-header";

import { ProfileForm } from "@/components/member/profile-form";
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";

interface EditMemberPageProps {
  params: Promise<{
    user_id: string;
  }>;
}

export default function EditMemberPage({ params }: EditMemberPageProps) {
  const { data, isLoading, error } = useGetCurrentUser();

  if (isLoading) return <div>Đang tải dữ liệu người dùng...</div>;
  if (error) return <div>Lỗi khi tải thông tin người dùng.</div>;
  const userInfo = data;

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
          <p className="text-muted-foreground mb-8">User ID: {data?.id}</p>

          {/* Member edit form will be implemented here */}
          <div className="space-y-6">
            <div className="rounded-lg border p-6">
              <h3 className="mb-2 font-semibold">Edit Form</h3>
              <ProfileForm defaultValues={userInfo} />
            </div>

            {/* <div className="rounded-lg border p-6">
              <CourseCertificateForm user={userInfo as GetOneUserResponse} />
            </div>
            <div className="rounded-lg border p-6">
              <EventCertificateForm user={userInfo as GetOneUserResponse} />
            </div>
            <div className="rounded-lg border p-6">
              <ExperienceForm user={userInfo as GetOneUserResponse} />
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
