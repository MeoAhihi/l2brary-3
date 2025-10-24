"use client";

import {
  Calendar,
  CheckSquare,
  Gamepad2,
  Settings,
  Stamp,
  TrendingUp,
  Users,
} from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import { use } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { useSessionAttendanceQuery, useSessionByIdQuery } from "@/hooks";
import { useStudentRosterQuery } from "@/hooks/enrollments/useStudentRoster";
import { useGameListQuery } from "@/hooks/game/use-game.queries";

interface ManageSessionPageProps {
  params: Promise<{
    "session-id": string;
  }>;
}

export default function ManageSessionPage({ params }: ManageSessionPageProps) {
  const { "session-id": sessionId } = use(params);

  const { data: session, isLoading: isLoadingSession } = useSessionByIdQuery({
    sessionId,
  });

  const { data: attendance, isLoading: isLoadingAttendance } =
    useSessionAttendanceQuery({ sessionId });

  const { data: game, isLoading: isLoadingGame } = useGameListQuery(sessionId);

  const { data: roster, isLoading: isLoadingRoster } = useStudentRosterQuery(
    session?.course.id ?? "",
  );

  if (
    isLoadingSession ||
    isLoadingAttendance ||
    isLoadingRoster ||
    isLoadingGame
  )
    return <div>Vui lòng chờ giây lát ...</div>;

  return (
    <>
      <Head>
        <title>Session Overview | Admin | L2brary</title>
        <meta name="description" content="Session overview and analytics" />
      </Head>
      <div className="space-y-6">
        {/* Session Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Sỉ số"
            icon={<Users className="h-4 w-4" />}
            value={roster?.length}
            description="+5 from last session"
          />

          <StatCard
            title="Hiện diện"
            icon={<CheckSquare className="h-4 w-4" />}
            value={attendance?.length}
            description="93% attendance rate"
          />

          <StatCard
            title="Vắng"
            icon={<Stamp className="h-4 w-4" />}
            value={(roster?.length ?? 0) - (attendance?.length ?? 0)}
            description="For participation"
          />

          <StatCard
            title="Số trò chơi"
            icon={<Gamepad2 className="h-4 w-4" />}
            value={game?.length}
            description="Average score: 85%"
          />
        </div>

        {/* Session Details */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Thông tin buổi học
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Date:</span>
                <span className="text-muted-foreground text-sm">
                  {session?.startTime
                    ? new Date(session.startTime).toLocaleString("vi-VN", {
                        timeZone: "Asia/Ho_Chi_Minh",
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "--"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Time:</span>
                <span className="text-muted-foreground text-sm">
                  {session?.startTime && session?.endTime
                    ? `${new Date(session.startTime).toLocaleTimeString(
                        "vi-VN",
                        {
                          timeZone: "Asia/Ho_Chi_Minh",
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )} - ${new Date(session.endTime).toLocaleTimeString(
                        "vi-VN",
                        {
                          timeZone: "Asia/Ho_Chi_Minh",
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}`
                    : "--"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Duration:</span>
                <span className="text-muted-foreground text-sm">
                  {session?.startTime && session?.endTime
                    ? (() => {
                        const start = new Date(session.startTime).getTime();
                        const end = new Date(session.endTime).getTime();
                        const durationMs = end - start;
                        if (durationMs <= 0) return "--";
                        const hours = Math.floor(durationMs / (1000 * 60 * 60));
                        const minutes = Math.floor(
                          (durationMs % (1000 * 60 * 60)) / (1000 * 60),
                        );
                        if (hours > 0 && minutes > 0) {
                          return `${hours} hours ${minutes} minutes`;
                        } else if (hours > 0) {
                          return `${hours} hours`;
                        } else if (minutes > 0) {
                          return `${minutes} minutes`;
                        } else {
                          return "< 1 minute";
                        }
                      })()
                    : "--"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Course:</span>
                <span className="text-muted-foreground text-sm">
                  {session?.course.title}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Thao tác nhanh
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link
                href={`/admin/ld/sessions/${sessionId}/manage/check-in`}
                passHref
                legacyBehavior
              >
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  asChild
                >
                  <a>
                    <CheckSquare className="mr-2 h-4 w-4" />
                    Quản lý điểm danh
                  </a>
                </Button>
              </Link>
              <Link
                href={`/admin/ld/sessions/${sessionId}/manage/game-log`}
                passHref
                legacyBehavior
              >
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  asChild
                >
                  <a>
                    <Gamepad2 className="mr-2 h-4 w-4" />
                    Ghi nhận kết quả trò chơi
                  </a>
                </Button>
              </Link>
              <Link
                href={`/admin/ld/sessions/${sessionId}/manage/settings`}
                passHref
                legacyBehavior
              >
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  asChild
                >
                  <a>
                    <Settings className="mr-2 h-4 w-4" />
                    Chỉnh sửa Tiết học
                  </a>
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        {/* <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 rounded-lg border p-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/01.png" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">John Doe checked in</p>
                  <p className="text-muted-foreground text-xs">2 minutes ago</p>
                </div>
                <Badge variant="secondary">Check-in</Badge>
              </div>

              <div className="flex items-center gap-4 rounded-lg border p-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/02.png" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Jane Smith received a stamp
                  </p>
                  <p className="text-muted-foreground text-xs">5 minutes ago</p>
                </div>
                <Badge variant="secondary">Stamp</Badge>
              </div>

              <div className="flex items-center gap-4 rounded-lg border p-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/03.png" />
                  <AvatarFallback>MJ</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Mike Johnson completed game
                  </p>
                  <p className="text-muted-foreground text-xs">8 minutes ago</p>
                </div>
                <Badge variant="secondary">Game</Badge>
              </div>
            </div>
          </CardContent>
        </Card> */}
      </div>
    </>
  );
}
