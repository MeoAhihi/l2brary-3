import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { User2 } from "lucide-react";

type CourseGroupProps = {
  group: {
    id: string;
    name: string;
    courses: number;
  };
};

export default function CourseGroup({ group }: CourseGroupProps) {
  return (
    <Card className="flex items-center">
      <CardContent className="flex items-center gap-4 p-4 w-full">
        <div className=" flex items-center justify-center rounded-md bg-muted-foreground/10">
          <User2 className="text-muted-foreground" size={28} />
        </div>
        <div className="flex flex-col justify-center flex-1">
          <div className="font-semibold text-lg mb-0.5">{group.name}</div>
          <div className="text-muted-foreground text-sm">
            {group.courses} courses
          </div>
        </div>
      </CardContent>
    </Card>
  );
}