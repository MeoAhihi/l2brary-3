"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import {
  Activity,
  Cake,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
  Clipboard,
  Mail,
  Mars,
  MinusCircle,
  Phone,
  User,
  UserPlus,
  Venus,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useExample } from "./example";
import { OffboardButton } from "./offboard-button";
import { useUnassignRole } from "@/hooks/users";
import { ClickableRoleBadge } from "./clickable-role-badge";
import { AssignRoleBadge } from "./assign-role-badge";
import { useRouter } from "next/navigation";

export default function MemberTable() {
  const { isLoading, setPage, page, data, isError } = useExample();
  const router = useRouter();
  if (isLoading)
    return (
      <>
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="my-2 h-40 w-full" />
        ))}
      </>
    );
  if (isError) return "Uh Oh";
  return (
    <>
      <div className="flex flex-col gap-2">
        {data.items.map((user: any) => (
          <Card key={user.id} className="flex flex-row">
            <CardHeader className="w-24">
              <Avatar className="h-20 w-20 object-cover">
                <AvatarImage src={user.avatarUrl} alt={user.fullName} />
              </Avatar>
            </CardHeader>
            <CardContent className="flex w-full flex-col gap-2">
              <div className="flex flex-row flex-wrap items-baseline gap-4">
                <span className="text-2xl font-bold">{user.fullName}</span>
                <span>
                  {user.gender === "male" ? (
                    <Mars className="text-blue-400" />
                  ) : (
                    <Venus className="text-pink-400" />
                  )}
                </span>
                <span className="text-md text-gray-400 dark:text-gray-700">
                  {user.internationalName}
                </span>
              </div>
              <div className="flex flex-row flex-wrap items-baseline gap-4 text-sm text-gray-400 dark:text-gray-600">
                <span className="flex flex-row items-center gap-2">
                  <Cake className="h-4 w-4" />
                  <span>
                    {user.birthdate
                      ? user.birthdate.split("-").reverse().join("/")
                      : "---"}
                  </span>
                </span>
                <span className="flex flex-row items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{user.phoneNumber}</span>
                </span>
                <span className="flex flex-row items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>{user.email ?? "---"}</span>
                </span>
              </div>
              <div className="flex flex-row flex-wrap items-baseline gap-4 text-sm text-gray-400 dark:text-gray-600">
                {user.rank ? (
                  <Badge>{user.rank}</Badge>
                ) : (
                  <span>-Chưa phân cấp-</span>
                )}
                {(user.roles ?? []).length !== 0 ? (
                  user.roles.map((r: any) => (
                    <ClickableRoleBadge role={r} userId={user.id} />
                  ))
                ) : (
                  <span>-chưa có role-</span>
                )}
                <AssignRoleBadge user={user} />
                <span>
                  💪 {user.experiences ? user.experiences.length : 0} thẻ kinh
                  nghiệm
                </span>
                <span>
                  🤓{" "}
                  {user.courseCertificates ? user.courseCertificates.length : 0}{" "}
                  chứng nhận lớp học
                </span>
                <span>
                  🏃{" "}
                  {user.eventCertificates ? user.eventCertificates.length : 0}{" "}
                  chứng nhận sự kiện
                </span>
              </div>
              <div className="flex flex-row flex-wrap items-baseline gap-4 text-sm text-gray-400 dark:text-gray-600">
                <span className="flex flex-row items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Cập nhật
                  {" " +
                    formatDistanceToNow(user.updatedAt, {
                      addSuffix: true,
                      locale: vi,
                    })}
                </span>
                <span className="flex flex-row items-center gap-2">
                  <UserPlus className="h-4 w-4" /> Tham gia từ
                  {" " +
                    formatDistanceToNow(user.createdAt, {
                      addSuffix: true,
                      locale: vi,
                    })}
                </span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-1">
              <Button
                size="sm"
                variant="outline"
                className="w-full"
                onClick={() => {
                  navigator.clipboard.writeText(user.id);
                  toast("Sao chép ID thành viên vào clipboard", {
                    action: {
                      label: "OK",
                      onClick: () => {},
                    },
                    description: (
                      <span className="text-gray-500">{user.id}</span>
                    ),
                    duration: 3000,
                  });
                }}
              >
                <Clipboard />
                Sao chép ID
              </Button>
              <Button size="sm" className="w-full" asChild>
                <Link
                  href={"/admin/members/" + user.id}
                  className="flex w-full items-center justify-center"
                >
                  <User />
                  Hồ sơ
                </Link>
              </Button>
              <OffboardButton user={user} />
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="mt-4 flex flex-col items-center justify-center gap-2">
        <div className="flex flex-row items-center gap-4">
          <Button
            onClick={() => setPage(1)}
            disabled={page === 1}
            variant="outline"
          >
            <ChevronFirst />
          </Button>

          <ButtonGroup>
            <Button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              variant="outline"
            >
              <ChevronLeft />
            </Button>
            <Button variant="outline" disabled>
              {page} / {data.pageCount} Trang
            </Button>
            <Button
              onClick={() => setPage(page + 1)}
              disabled={!!data && page >= data.pageCount}
              variant="outline"
            >
              <ChevronRight />
            </Button>
          </ButtonGroup>
          <Button
            onClick={() => setPage(data.pageCount)}
            disabled={!!data && page >= data.pageCount}
            variant="outline"
          >
            <ChevronLast />
          </Button>
        </div>
      </div>
    </>
  );
}
