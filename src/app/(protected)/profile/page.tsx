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
import timelineData from "@/constants/activities.json";
import classJoining from "@/constants/class-joining.json";
import { Metadata } from "next";
import { MyChart } from "./chart";

export const metadata: Metadata = {
  title: "My Profile | L2brary",
  description: "View and manage your personal profile information",
};

export default function ProfilePage() {
  const engagement = {
    recentActivityTime: new Date('2025-01-01').toLocaleString(),
    recentAttendanceTime: new Date('2025-01-01').toLocaleString(),
  }
  const classCerts = [
    "Chuyên đề Vật lý hiện đại",
    "Thực hành Quang học",
    "Hội thảo Vật lý lượng tử",
    "Workshop Điện từ học",
    "Khóa học Cơ học cổ điển",
    "Thí nghiệm Vật lý hạt nhân",
    "Chuyên đề Vật lý thiên văn"
  ]
  const experiences = [
    "Olympic Vật lý",
    "Thực tập lab",
    "CLB Vật lý",
    "Trợ giảng",
    "Hội thảo",
    "Nghiên cứu",
    "Tình nguyện"
  ]
  const seminars = [
    "Hội thảo Khoa học",
    "Seminar Vật lý ứng dụng",
    "Hội nghị Nghiên cứu trẻ",
    "Workshop STEM",
    "Hội thảo Công nghệ mới",
    "Seminar Đổi mới sáng tạo",
    "Hội thảo Giáo dục"
  ]
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
              avatarSrc="/image.png"
              name="Nguyen Van A"
              phone="(+84) 123 456 789"
              email="m@example.com"
              className="12A3"
              gender="Nam"
              birthday="12/03/2003"
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
              <ClassJoiningTable data={classJoining} />
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h2 className="text-2xl font-medium mb-4">Hoạt động Gần đây</h2>
              <Timeline className="mt-8">
                {timelineData.map((item) => (
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
                ))}
              </Timeline>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Profile information will be implemented here */}
      <div className="space-y-6">
        <div className="p-6 border rounded-lg">
          <h3 className="font-semibold mb-2">Club Status</h3>
          <p className="text-sm text-muted-foreground">
            Member status and rank information will be displayed here
          </p>
        </div>

        <div className="p-6 border rounded-lg">
          <h3 className="font-semibold mb-2">Account Settings</h3>
          <p className="text-sm text-muted-foreground">
            Account management options will be displayed here
          </p>
        </div>
      </div>
    </>
  );
}
