"use client";

// import { use } from "react";
import {
  Award,
  BarChart3,
  BookOpen,
  Crown,
  Shield,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { Metadata } from "next";
import Head from "next/head";
import { usePathname } from "next/navigation";
import { use } from "react";

import { getEnrollments } from "@/apis/enrollment.api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSessionsQuery } from "@/hooks";
import { useGetCourseById } from "@/hooks/courses/useGetCourseById";
import { useEnrollmentsQuery } from "@/hooks/enrollments";

const getPositionIcon = (role: string) => {
  switch (role) {
    case "assistant":
      return <Crown className="h-4 w-4 text-yellow-600" />;
    case "leader":
      return <Star className="h-4 w-4 text-blue-600" />;
    case "mentor":
      return <Shield className="h-4 w-4 text-green-600" />;
    case "coordinator":
      return <Award className="h-4 w-4 text-purple-600" />;
    default:
      return <Users className="h-4 w-4 text-gray-600" />;
  }
};

const getPositionBadge = (role: string) => {
  switch (role) {
    case "assistant":
      return (
        <Badge className="bg-yellow-100 text-yellow-800">
          Course Assistant
        </Badge>
      );
    case "leader":
      return (
        <Badge className="bg-blue-100 text-blue-800">Discussion Leader</Badge>
      );
    case "mentor":
      return <Badge className="bg-green-100 text-green-800">Peer Mentor</Badge>;
    case "coordinator":
      return (
        <Badge className="bg-purple-100 text-purple-800">
          Study Coordinator
        </Badge>
      );
    default:
      return <Badge variant="secondary">Student</Badge>;
  }
};

export default function ManageCoursePage({
  params,
}: {
  params: Promise<{
    "course-id": string;
  }>;
}) {
  const { "course-id": courseId } = use(params);

  const { data: enrolments, isLoading } = useEnrollmentsQuery({ courseId });

  const { data: sessions } = useSessionsQuery({
    apiParams: { courseId },
  });

  if (isLoading) return "VUi lòng chờ giây lát...";
  return (
    <>
      <Head>
        <title>Course Overview | Admin | L2brary</title>
        <meta name="description" content="Course overview and analytics" />
      </Head>
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tổng số tham gia
              </CardTitle>
              <Users className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{enrolments!.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Số tiết đã học
              </CardTitle>
              <BarChart3 className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{sessions!.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Số mô-đun</CardTitle>
              <BookOpen className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tỉ lệ hoàn thành
              </CardTitle>
              <TrendingUp className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78.5%</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Hoạt động gần đây</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      Một thành viên vừa đăng ký
                    </p>
                    <p className="text-muted-foreground text-xs">
                      2 phút trước
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Mô-đun vừa hoàn thành</p>
                    <p className="text-muted-foreground text-xs">
                      15 phút trước
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Game log vừa hoàn tất</p>
                    <p className="text-muted-foreground text-xs">1 giờ trước</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Thao tác nhanh</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <button className="hover:bg-accent w-full rounded-lg border p-3 text-left transition-colors">
                  <div className="font-medium">Thêm Mô-đun mới</div>
                  <div className="text-muted-foreground text-sm">
                    Tạo nội dung cho khóa học
                  </div>
                </button>
                <button className="hover:bg-accent w-full rounded-lg border p-3 text-left transition-colors">
                  <div className="font-medium">Duyệt đăng ký</div>
                  <div className="text-muted-foreground text-sm">
                    Phê duyệt các yêu cầu chờ xử lý
                  </div>
                </button>
                <button className="hover:bg-accent w-full rounded-lg border p-3 text-left transition-colors">
                  <div className="font-medium">Xuất báo cáo</div>
                  <div className="text-muted-foreground text-sm">
                    Tải xuống dữ liệu phân tích khóa học
                  </div>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Students with Special Positions */}
        {/* <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Students with Special Positions</CardTitle>
              <Button variant="outline" size="sm">
                Manage Positions
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {/* {studentsWithPositions.map((student) => (
              <div
                key={student.id}
                className="hover:bg-accent rounded-lg border p-4 transition-colors"
              >
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={student.avatar} />
                      <AvatarFallback>
                        {student.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium">{student.name}</div>
                      <div className="text-muted-foreground text-xs">
                        {student.email}
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-6 w-6 p-0">
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Edit Position</DropdownMenuItem>
                      <DropdownMenuItem>Remove Position</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    {getPositionIcon(student.role)}
                    {getPositionBadge(student.role)}
                  </div>

                  <div className="text-muted-foreground flex items-center justify-between text-xs">
                    <span>Joined: {student.joinedDate}</span>
                    <span>Performance: {student.performance}%</span>
                  </div>

                  <div className="h-1.5 w-full rounded-full bg-gray-200">
                    <div
                      className="h-1.5 rounded-full bg-blue-600"
                      style={{ width: `${student.performance}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))} 
            </div>
          </CardContent>
        </Card> */}
      </div>
    </>
  );
}
