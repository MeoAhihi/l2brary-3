import { Calendar, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { formatScheduleDetail } from "@/lib/format";
import { ScheduleDetail } from "@/types/courses/type";

type CourseCardProps = {
  id: string;
  thumbnail: string;
  title: string;
  description?: string;
  recurrentRule: ScheduleDetail;
  studentsCount?: number;
};

export function CourseCard(props: CourseCardProps) {
  const {
    id,
    thumbnail,
    title,
    description = "",
    recurrentRule,
    studentsCount = 0,
  } = props;

  return (
    <Card className="flex flex-col overflow-hidden pt-0">
      <div className="relative aspect-3/2 w-full">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="rounded-t object-cover"
          sizes="(min-width: 1024px) 256px, (min-width: 640px) 192px, 100vw"
          priority
        />
      </div>
      <CardContent className="flex-1">
        <div className="flex-1">
          <CardTitle className="flex flex-row justify-between text-lg">
            {title}
            <div className="flex flex-row items-center gap-1 self-start">
              <Users className="text-mute h-3 w-3" />
              <span className="text-sm font-semibold">{studentsCount}</span>
            </div>
          </CardTitle>
          <CardDescription className="mt-1 text-sm">
            {description}
          </CardDescription>
        </div>
        <div className="text-muted-foreground mt-2 flex flex-row items-center gap-1 text-xs capitalize">
          <Calendar className="h-4 w-4" />{" "}
          {formatScheduleDetail(recurrentRule, false)}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 pt-0">
        <Button asChild variant="default" size="sm">
          <Link href={`/courses/${id}`}>Xem thêm</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
