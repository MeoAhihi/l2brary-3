import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users } from "lucide-react";

type CourseCardProps = {
  thumbnail: string;
  title: string;
  description: string;
  reccurentRule: string; // e.g. "Weekly (Monday, Wednesday)", "Monthly"
  studentsCount: number;
  deatilUrl: string;
  registerUrl: string;
};

export function CourseCard({
  thumbnail,
  title,
  description,
  reccurentRule,
  studentsCount,
  deatilUrl,
  registerUrl,
}: CourseCardProps) {
  return (
    <Card className="flex flex-col pt-0 overflow-hidden">
      <div className="relative w-full aspect-3/2">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover rounded-t"
          sizes="(min-width: 1024px) 256px, (min-width: 640px) 192px, 100vw"
          priority
        />
      </div>
      <CardContent className="flex-1">
        <div className="flex-1">
          <CardTitle className="text-lg flex flex-row justify-between">
            {title}
            <div className="flex flex-row items-center self-start gap-1">
              <Users className="w-3 h-3 text-mute" />
              <span className="font-semibold text-sm">{studentsCount}</span>
            </div>
          </CardTitle>
          <CardDescription className="mt-1 text-sm">
            {description}
          </CardDescription>
        </div>
        <div className="mt-2 text-xs text-muted-foreground flex flex-row items-center gap-1">
          <Calendar className="h-4 w-4" /> {reccurentRule}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 justify-end pt-0">
        <Button asChild variant="outline" size="sm">
          <a href={deatilUrl}>More Info</a>
        </Button>
        <Button asChild variant="default" size="sm">
          <a href={registerUrl}>Join Now</a>
        </Button>
      </CardFooter>
    </Card>
  );
}
