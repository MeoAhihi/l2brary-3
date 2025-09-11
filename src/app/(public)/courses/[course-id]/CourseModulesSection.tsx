"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Course, CourseModule, CourseLesson } from "@/types/ld.types";
import { ChevronDown, Play, BookOpen, FileText, HelpCircle, Clock, CheckCircle } from "lucide-react";
import { useState } from "react";

interface CourseModulesSectionProps {
  course: Course;
}

const getLessonIcon = (type: CourseLesson["type"]) => {
  switch (type) {
    case "video":
      return <Play className="h-4 w-4" />;
    case "reading":
      return <BookOpen className="h-4 w-4" />;
    case "assignment":
      return <FileText className="h-4 w-4" />;
    case "quiz":
      return <HelpCircle className="h-4 w-4" />;
    default:
      return <BookOpen className="h-4 w-4" />;
  }
};

const getLessonTypeLabel = (type: CourseLesson["type"]) => {
  switch (type) {
    case "video":
      return "Video";
    case "reading":
      return "Đọc";
    case "assignment":
      return "Bài tập";
    case "quiz":
      return "Quiz";
    default:
      return "Nội dung";
  }
};

function LessonItem({ lesson }: { lesson: CourseLesson }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
      <div className="flex-shrink-0">
        {lesson.isCompleted ? (
          <CheckCircle className="h-4 w-4 text-green-500" />
        ) : (
          <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/30" />
        )}
      </div>
      
      <div className="flex-shrink-0 text-muted-foreground">
        {getLessonIcon(lesson.type)}
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm">{lesson.title}</p>
        <div className="flex items-center gap-2 mt-1">
          <Badge variant="outline" className="text-xs">
            {getLessonTypeLabel(lesson.type)}
          </Badge>
          {lesson.duration && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {lesson.duration}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ModuleItem({ module }: { module: CourseModule }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <div className="flex items-center gap-3 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer">
          <div className="flex-shrink-0">
            {module.isCompleted ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold">{module.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{module.description}</p>
            {module.duration && (
              <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {module.duration}
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {module.lessons && (
              <Badge variant="secondary" className="text-xs">
                {module.lessons.length} bài học
              </Badge>
            )}
            <ChevronDown 
              className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
            />
          </div>
        </div>
      </CollapsibleTrigger>
      
      <CollapsibleContent>
        <div className="mt-2 ml-8 space-y-2">
          {module.lessons?.map((lesson) => (
            <LessonItem key={lesson.id} lesson={lesson} />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export default function CourseModulesSection({ course }: CourseModulesSectionProps) {
  if (!course.modules || course.modules.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Nội dung khóa học</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            Nội dung khóa học sẽ được cập nhật sớm.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nội dung khóa học</CardTitle>
        <p className="text-sm text-muted-foreground">
          {course.modules.length} chương • {course.modules.reduce((total, module) => total + (module.lessons?.length || 0), 0)} bài học
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {course.modules.map((module) => (
            <ModuleItem key={module.id} module={module} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
