"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { CourseItem } from "../../types/response";

interface CourseDescriptionSectionProps {
  course: CourseItem;
}

export default function CourseDescriptionSection({
  course,
}: CourseDescriptionSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mô tả khóa học</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm max-w-none">
          <p className="text-muted-foreground leading-relaxed">
            {course.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
