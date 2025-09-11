"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Course } from "@/types/ld.types";
import { Calendar, Users, ExternalLink, Clock } from "lucide-react";

interface CourseInfoSectionProps {
  course: Course;
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
          <Clock className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="font-medium">Lịch học</p>
            <p className="text-sm text-muted-foreground">
              {course.recurrentRule} - {course.time}
            </p>
          </div>
        </div>

        {/* Student Count */}
        <div className="flex items-center gap-3">
          <Users className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="font-medium">Số lượng học viên</p>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                {course.studentsCount} học viên
              </Badge>
              {course.maxStudents && (
                <span className="text-sm text-muted-foreground">
                  / {course.maxStudents} tối đa
                </span>
              )}
            </div>
          </div>
        </div>

        {/* External Chat */}
        {course.externalChatUrl && (
          <div className="flex items-center gap-3">
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="font-medium">Nhóm chat</p>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="mt-1"
              >
                <a 
                  href={course.externalChatUrl} 
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
          <div className="h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-primary" />
          </div>
          <div>
            <p className="font-medium">Nhóm khóa học</p>
            <Badge variant="outline" className="mt-1">
              {course.classGroup}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
