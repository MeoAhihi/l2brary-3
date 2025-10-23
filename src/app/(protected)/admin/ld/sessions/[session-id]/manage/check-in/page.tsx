"use client";

import { CheckSquare, Clock, UserCheck, Users, UserX } from "lucide-react";
import Head from "next/head";
import { useParams } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { useSessionAttendanceQuery, useSessionByIdQuery } from "@/hooks";
import { useStudentRosterQuery } from "@/hooks/enrollments/useStudentRoster";
import { useGameListQuery } from "@/hooks/game/use-game.queries";
import { RefUserDto } from "@/types/user/ref-user.dto";

import ManualCheckinMembersTable from "./manual-checkin-members-table";

const members = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "a@example.com",
    checkedIn: true,
    status: "present",
    checkInTime: "09:00",
    avatar: "/path/to/avatar1.png",
  },
  {
    id: 2,
    name: "Trần Thị B",
    email: "b@example.com",
    checkedIn: false,
    status: "absent",
    avatar: "/path/to/avatar2.png",
  },
  {
    id: 3,
    name: "Lê Văn C",
    email: "c@example.com",
    checkedIn: true,
    status: "late",
    checkInTime: "09:05",
    avatar: "/path/to/avatar3.png",
  },
];

export default function CheckInPage() {
  const params = useParams<{ "session-id": string }>();
  const { "session-id": sessionId } = params;

  const { data: session, isLoading: isLoadingSession } = useSessionByIdQuery({
    sessionId,
  });

  const { data: attendance, isLoading: isLoadingAttendance } =
    useSessionAttendanceQuery({ sessionId });

  const { data: game, isLoading: isLoadingGame } = useGameListQuery(sessionId);

  const { data: roster, isLoading: isLoadingRoster } = useStudentRosterQuery(
    session?.course.id,
  );

  if (
    isLoadingSession ||
    isLoadingAttendance ||
    isLoadingRoster ||
    isLoadingGame
  )
    return <div>Vui lòng chờ giây lát ...</div>;

  // Định nghĩa các biến đếm
  const absentCount = members.filter((member) => !member.checkedIn).length;
  const lateCount = members.filter((member) => member.status === "late").length;

  return (
    <>
      <Head>
        <title>Check-in Management | Admin | L2brary</title>
        <meta
          name="description"
          content="Manage student check-ins for the session"
        />
      </Head>
      <div className="space-y-6">
        {/* Check-in Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard
            title="Present"
            icon={<UserCheck className="h-4 w-4 text-green-600" />}
            value={<span className="text-green-600">{attendance.length}</span>}
            description={`${roster?.length ? ((attendance.length / roster?.length) * 100).toFixed(1) : 0}% of total`}
          />
          <StatCard
            title="Absent"
            icon={<UserX className="h-4 w-4 text-red-600" />}
            value={<span className="text-red-600">{absentCount}</span>}
            description={`${roster?.length ? ((absentCount / roster?.length) * 100).toFixed(1) : 0}% of total`}
          />
          <StatCard
            title="Late"
            icon={<Clock className="h-4 w-4 text-yellow-600" />}
            value={<span className="text-yellow-600">{lateCount}</span>}
            description={`${roster?.length ? ((lateCount / roster?.length) * 100).toFixed(1) : 0}% of total`}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Quick Check-in */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckSquare className="h-5 w-5" />
                Đã check-in
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {attendance
                .filter((a: { user: RefUserDto; attendTime: Date }) => !!a.user)
                .map((a: { user: RefUserDto; attendTime: Date }) => ({
                  ...a,
                  attendTime: new Date(a.attendTime),
                }))
                .sort(
                  (a: any, b: any) =>
                    new Date(b.attendTime).getTime() -
                    new Date(a.attendTime).getTime(),
                )
                .map(
                  ({
                    user,
                    attendTime,
                  }: {
                    user: RefUserDto;
                    attendTime: Date;
                  }) => {
                    return (
                      <Card key={user.id} className="flex flex-row">
                        <CardHeader>
                          <Avatar>
                            <AvatarImage
                              src={user.avatarUrl || undefined}
                              alt={user.fullName}
                            />
                            <AvatarFallback>{user.fullName}</AvatarFallback>
                          </Avatar>
                        </CardHeader>
                        <CardContent className="w-full">
                          <div className="flex flex-col justify-center">
                            <div className="font-semibold">
                              {user?.fullName}
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="text-sm text-gray-500">
                          {new Date(attendTime).toLocaleString("vi-VN", {
                            timeZone: "Asia/Ho_Chi_Minh",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            day: "2-digit",
                            month: "2-digit",
                            year: "2-digit",
                          })}
                        </CardFooter>
                      </Card>
                    );
                  },
                )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckSquare className="h-5 w-5" />
                Quick Check-in
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Manual check in */}
              <ManualCheckinMembersTable courseId={session.course.id} />
            </CardContent>
          </Card>
        </div>

        {/* Student List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Student Attendance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre>{JSON.stringify(attendance, null, 2)}</pre>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
