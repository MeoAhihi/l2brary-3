import { Metadata } from "next";

import { ClassJoiningTable } from "@/components/member/class-joining-table";
import ProfileCardContent from "@/components/member/profile-card-content";
import { Badge } from "@/components/ui/badge";
import { BadgeCard } from "@/components/ui/badge-card";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import PageHeader from "@/components/ui/page-header";
import {
  Timeline,
  TimelineDescription,
  TimelineHeader,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
} from "@/components/ui/timeline";

import { MyChart } from "./chart";

export const metadata: Metadata = {
  title: "My Profile | L2brary",
  description: "View and manage your personal profile information",
};

export default function ProfilePage() {
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
  const engagement = {
    recentActivityTime: new Date("2025-01-01").toLocaleString(),
    recentAttendanceTime: new Date("2025-01-01").toLocaleString(),
  };
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
      <PageHeader
        pageTitle="Hồ sơ cá nhân"
        descriptions={[
          {
            label: `Hoạt động gần nhất: ${engagement.recentActivityTime}`,
            status: "warning",
          },
          {
            label: `Tham gia gần nhất: ${engagement.recentAttendanceTime}`,
            status: "danger",
          },
        ]}
      />
      <p className="text-muted-foreground mb-8">
        Xem và quản lý thông tin cá nhân và trạng thái của bạn
      </p>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-4 space-y-4">
          <Card className="relative">
            <Badge className="absolute top-2.5 left-2.5 text-xs font-semibold">
              Quản lý
            </Badge>
            <ProfileCardContent
              id={user.id}
              avatarUrl={user.avatarUrl}
              name={user.name}
              phone={user.phone}
              email={user.email}
              className={user.className}
              gender={user.gender}
              birthday={user.birthday}
            />
          </Card>
          <BadgeCard title="Chứng nhận lớp học" items={classCerts} />
          <BadgeCard title="Kinh nghiệm" items={experiences} />
          <BadgeCard title="Tham gia Sự kiện" items={seminars} />
        </div>
        <div className="col-span-8 space-y-4">
          <Card>
            <CardHeader>
              <h3 className="font-semibold">Lớp học</h3>
            </CardHeader>
            <CardContent>
              <MyChart />
              <ClassJoiningTable data={[]} />
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h2 className="mb-4 text-2xl font-medium">Hoạt động Gần đây</h2>
              <Timeline className="mt-8">
                {/*                 {timelineData.map((item) => (
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

      {/* Profile information will be implemented here */}
      <div className="space-y-6">
        <div className="rounded-lg border p-6">
          <h3 className="mb-2 font-semibold">Club Status</h3>
          <p className="text-muted-foreground text-sm">
            Member status and rank information will be displayed here
          </p>
        </div>

        <div className="rounded-lg border p-6">
          <h3 className="mb-2 font-semibold">Account Settings</h3>
          <p className="text-muted-foreground text-sm">
            Account management options will be displayed here
          </p>
        </div>
      </div>
    </>
  );
}
