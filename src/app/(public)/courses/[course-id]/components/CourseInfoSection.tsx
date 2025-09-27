"use client";

import { Calendar, Clock, ExternalLink, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatScheduleDetail } from "@/lib/format";

import { CourseItem } from "../../types/response";

interface CourseInfoSectionProps {
  course: CourseItem;
}

export default function CourseInfoSection({ course }: CourseInfoSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Thông tin khóa học
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Schedule Information */}
        <div className="flex items-center gap-3">
          <Clock className="text-muted-foreground h-4 w-4" />
          <div>
            <p className="font-medium">Lịch học</p>
            <p className="text-muted-foreground text-sm capitalize">
              {formatScheduleDetail(course.scheduleDetail)}
            </p>
          </div>
        </div>

        {/* Student Count */}
        <div className="flex items-center gap-3">
          <Users className="text-muted-foreground h-4 w-4" />
          <div>
            <p className="font-medium">Số lượng học viên</p>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{course.maxStudents} học viên</Badge>
              {course.maxStudents && (
                <span className="text-muted-foreground text-sm">
                  / {course.maxStudents} tối đa
                </span>
              )}
            </div>
          </div>
        </div>

        {/* External Chat */}
        {course.chatGroupUrl && (
          <div className="flex items-center gap-3">
            <ExternalLink className="text-muted-foreground h-4 w-4" />
            <div>
              <p className="font-medium">Nhóm chat</p>
              <Button variant="outline" size="sm" asChild className="mt-1">
                <a
                  href={course.chatGroupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-3 w-3" />
                  Tham gia nhóm chat
                </a>
              </Button>
            </div>
          </div>
        )}

        {/* Course Group */}
        <div className="flex items-center gap-3">
          <div className="bg-primary/20 flex h-4 w-4 items-center justify-center rounded-full">
            <div className="bg-primary h-2 w-2 rounded-full" />
          </div>
          <div>
            <p className="font-medium">Nhóm khóa học</p>
            <Badge variant="outline" className="mt-1">
              {course.group}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
