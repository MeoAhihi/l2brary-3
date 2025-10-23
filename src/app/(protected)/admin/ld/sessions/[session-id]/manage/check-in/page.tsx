"use client";

import { useQuery } from "@tanstack/react-query";
import { CheckSquare, Clock, UserCheck, UserX } from "lucide-react";
import Head from "next/head";
import { useParams } from "next/navigation";

import { getEnrollmentRosterByCourseId } from "@/apis/enrollment.api";
import { getSessionAttendance, getSessionById } from "@/apis/session.api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { EnrollmentItem } from "@/types/enrollment/response";
import { GetSessionAttendanceDto } from "@/types/session/get-session-attendance.dto";

import ManualCheckinMembersTable from "./manual-checkin-members-table";

export default function CheckInPage() {
  const params = useParams<{ "session-id": string }>();
  const { "session-id": sessionId } = params;

  const { data, isLoading } = useQuery({
    queryKey: ["ld", "session", "checkin", sessionId],
    queryFn: async () => {
      const session = await getSessionById(sessionId);
      const courseId = session.course.id;
      // const course = await getCourseById(courseId)
      const roster = (await getEnrollmentRosterByCourseId(courseId)).data;
      const attendances = await getSessionAttendance(sessionId);

      const notCheckedIn = roster.filter(
        (student: EnrollmentItem) =>
          !attendances?.some(
            (att: GetSessionAttendanceDto) => att.user.id === student.user?.id,
          ),
      );

      // Calculate 'late' time: start time plus lateThreshold (in minutes)
      let late: Date | undefined = undefined;
      if (session?.startTime && typeof session.lateThreshold === "number") {
        late = new Date(
          new Date(session.startTime).getTime() +
            session.lateThreshold * 60 * 1000,
        );
      }

      const checkedIn = attendances.map((a) => ({
        ...a,
        isLate: late ? new Date(a.attendTime) > late : false,
      }));
      const lateCount = checkedIn.filter((a) => a.isLate).length;
      const totalCount = roster.length;
      const checkedCount = attendances.length;
      const absentCount = notCheckedIn.length;

      return {
        checkedIn,
        notCheckedIn,
        roster,
        lateCount,
        totalCount,
        checkedCount,
        absentCount,
      };
    },
  });

  if (isLoading) return <div>Vui lòng chờ giây lát ...</div>;

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
            title="Hiện diện"
            icon={<UserCheck className="h-4 w-4 text-green-600" />}
            value={<span className="text-green-600">{data?.checkedCount}</span>}
            description={`${data?.totalCount ? ((data?.checkedCount / data?.totalCount) * 100).toFixed(1) : 0}% of total`}
          />
          <StatCard
            title="Vắng"
            icon={<UserX className="h-4 w-4 text-red-600" />}
            value={<span className="text-red-600">{data?.absentCount}</span>}
            description={`${data?.totalCount ? ((data?.absentCount / data?.totalCount) * 100).toFixed(1) : 0}% of total`}
          />
          <StatCard
            title="Đến trễ"
            icon={<Clock className="h-4 w-4 text-yellow-600" />}
            value={<span className="text-yellow-600">{data?.lateCount}</span>}
            description={`${data?.totalCount ? ((data?.lateCount / data?.totalCount) * 100).toFixed(1) : 0}% of total`}
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
              {data?.checkedIn
                .map((a) => ({
                  ...a,
                  attendTime: new Date(a.attendTime),
                }))
                .sort(
                  (a: any, b: any) =>
                    new Date(b.attendTime).getTime() -
                    new Date(a.attendTime).getTime(),
                )
                .map(({ user, attendTime, isLate }) => {
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
                          <div className="font-semibold">{user?.fullName}</div>
                        </div>
                      </CardContent>
                      <CardFooter className="text-sm text-gray-500">
                        {isLate ? (
                          <Badge className="bg-yellow-100 text-yellow-500 dark:bg-yellow-900 dark:text-yellow-200">
                            Đến trễ
                          </Badge>
                        ) : (
                          <Badge className="bg-green-100 text-green-500 dark:bg-green-900 dark:text-green-200">
                            Đến đúng giờ
                          </Badge>
                        )}
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
                })}
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
              <ManualCheckinMembersTable
                sessionId={sessionId}
                data={data?.notCheckedIn ?? []}
              />
            </CardContent>
          </Card>
        </div>

        {/* Student List */}
        {/* <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Student Attendance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre>{JSON.stringify(attendance, null, 2)}</pre>
          </CardContent>
        </Card> */}
      </div>
    </>
  );
}
