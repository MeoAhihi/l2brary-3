"use client";
import React from "react";

import ProfileCardContent from "@/components/member/profile-card-content";
import { Badge } from "@/components/ui/badge";
import { BadgeCard } from "@/components/ui/badge-card";
import { Card } from "@/components/ui/card";
import PageHeader from "@/components/ui/page-header";
import { useGetUserById } from "@/hooks/users";
import { Gender } from "@/types/gender.enum";

import { ActivityCard } from "./activity-card";
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";

// export const metadata: Metadata = {
//   title: "Member Details | Admin | L2brary",
//   description: "View member details and information",
// };

interface MemberDetailPageProps {
  params: Promise<{
    user_id: string;
  }>;
}

export default function MemberDetailPage() {
  const { data, isLoading } = useGetCurrentUser();

  if (isLoading) return <div>Vui lòng chờ giây lát...</div>;
  console.log(data);
  return (
    <>
      <PageHeader pageTitle={`Hồ sơ cá nhân`} />
      <p className="text-muted-foreground mb-8">
        Xem và quản lý thông tin cá nhân và trạng thái của bạn
      </p>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-4 space-y-4">
          <Card className="relative">
            <Badge className="absolute top-2.5 left-2.5 text-xs font-semibold">
              {data?.rank ?? "Newbie"}
            </Badge>
            <ProfileCardContent
              id={"asfasdf"}
              avatarUrl={data?.avatarUrl ?? ""}
              name={data?.fullName ?? ""}
              phone={data?.phoneNumber ?? ""}
              email={data?.email ?? ""}
              // className={user.className}
              gender={data?.gender === Gender.MALE ? "Nam" : "Nữ"}
              birthday={(() => {
                const date = new Date(data?.birthdate ?? "");
                const day = String(date.getDate()).padStart(2, "0");
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const year = date.getFullYear();
                return isNaN(date.getDate())
                  ? "---"
                  : `${day}/${month}/${year}`;
              })()}
            />
          </Card>
        </div>
        <div className="col-span-8 space-y-4">
          <BadgeCard
            title="Chứng nhận lớp học"
            items={data?.courseCertificates ?? []}
          />
          <BadgeCard title="Kinh nghiệm" items={data?.experiences ?? []} />
          <BadgeCard
            title="Tham gia Sự kiện"
            items={data?.eventCertificates ?? []}
          />
          <ActivityCard userId={data?.id ?? ""} />
        </div>
      </div>
      <div className="mb-4" />
    </>
  );
}
