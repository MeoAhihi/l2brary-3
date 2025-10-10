"use client";
import { Metadata } from "next";
import React from "react";

import { ClassJoiningTable } from "@/components/member/class-joining-table";
import ProfileCardContent from "@/components/member/profile-card-content";
import { Badge } from "@/components/ui/badge";
import { BadgeCard } from "@/components/ui/badge-card";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import PageHeader from "@/components/ui/page-header";
import { Timeline } from "@/components/ui/timeline";
import { useGetUserById } from "@/hooks/users";

import { MyChart } from "./chart";
import { Skeleton } from "@/components/ui/skeleton";
import { Gender } from "@/types/gender.enum";

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

  console.log("🚀 ~ MemberDetailPage ~ data:", data!.data);
  const userInfo = data!.data;
  const classCerts = [
    "Chuyên đề Vật lý hiện đại",
    "Thực hành Quang học",
    "Hội thảo Vật lý lượng tử",
    "Workshop Điện từ học",
    "Khóa học Cơ học cổ điển",
    "Thí nghiệm Vật lý hạt nhân",
    "Chuyên đề Vật lý thiên văn",
  ];
  const experiences = [
    "Olympic Vật lý",
    "Thực tập lab",
    "CLB Vật lý",
    "Trợ giảng",
    "Hội thảo",
    "Nghiên cứu",
    "Tình nguyện",
  ];
  const seminars = [
    "Hội thảo Khoa học",
    "Seminar Vật lý ứng dụng",
    "Hội nghị Nghiên cứu trẻ",
    "Workshop STEM",
    "Hội thảo Công nghệ mới",
    "Seminar Đổi mới sáng tạo",
    "Hội thảo Giáo dục",
  ];
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
              Quản lý
            </Badge>
            {/* {JSON.stringify(data)} */}
            <ProfileCardContent
              id={user_id}
              avatarUrl={"/image.png"}
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
          <Card>
            <CardContent>
              <h2 className="mb-4 text-2xl font-medium">Hoạt động Gần đây</h2>
              <Timeline className="mt-8">
                {/* {timelineData.map((item) => (
                  <TimelineItem key={item.id}>
                    <TimelineHeader>
                      <TimelineTime>{item.time}</TimelineTime>
                      <TimelineTitle>{item.title}</TimelineTitle>
                    </TimelineHeader>
                    {item.description && (
                      <TimelineDescription>
                        {item.description}
                      </TimelineDescription>
                    )}
                  </TimelineItem>
                ))} */}
              </Timeline>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="mb-4" />
    </>
  );
}
