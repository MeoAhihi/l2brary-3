"use client";
import { Metadata } from "next";
import React from "react";

import { ClassJoiningTable } from "@/components/member/class-joining-table";
import ProfileCardContent from "@/components/member/profile-card-content";
import { Badge } from "@/components/ui/badge";
import { BadgeCard } from "@/components/ui/badge-card";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import PageHeader from "@/components/ui/page-header";
import { Skeleton } from "@/components/ui/skeleton";
import { Timeline } from "@/components/ui/timeline";
import { useGetUserById } from "@/hooks/users";
import { Gender } from "@/types/gender.enum";

import { ActivityCard } from "./activity-card";
import { MyChart } from "./chart";

// export const metadata: Metadata = {
//   title: "Member Details | Admin | L2brary",
//   description: "View member details and information",
// };

interface MemberDetailPageProps {
  params: Promise<{
    user_id: string;
  }>;
}

export default function MemberDetailPage({ params }: MemberDetailPageProps) {
  const { user_id } = React.use(params);

  const { data, isLoading, error } = useGetUserById(user_id);

  if (isLoading) return <div>Vui lòng chờ giây lát...</div>;

  const userInfo = data!.data;
  return (
    <>
      <PageHeader pageTitle={`Hồ sơ: ${userInfo.fullName}`} />
      <p className="text-muted-foreground mb-8">
        Xem và quản lý thông tin cá nhân và trạng thái của {userInfo.fullName}
      </p>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-4 space-y-4">
          <Card className="relative">
            <Badge className="absolute top-2.5 left-2.5 text-xs font-semibold">
              {userInfo.rank ?? "Newbie"}
            </Badge>
            {/* {JSON.stringify(data)} */}
            <ProfileCardContent
              id={user_id}
              avatarUrl="/image.png"
              name={userInfo.fullName}
              phone={userInfo.phoneNumber}
              email={userInfo.email}
              // className={user.className}
              gender={userInfo.gender === Gender.MALE ? "Nam" : "Nữ"}
              birthday={(() => {
                const date = new Date(userInfo.birthdate);
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
            items={userInfo.courseCertificates ?? []}
          />
          <BadgeCard title="Kinh nghiệm" items={userInfo.experiences ?? []} />
          <BadgeCard
            title="Tham gia Sự kiện"
            items={userInfo.eventCertificates ?? []}
          />
          <ActivityCard userId={user_id} />
        </div>
      </div>
      <div className="mb-4" />
    </>
  );
}
