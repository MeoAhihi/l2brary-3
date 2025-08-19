import { Course } from "@/lib/courses";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";

export default function CourseCard({ course }: { course: Course }) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        {/* Course image (placeholder) */}
        <div className="w-full rounded-xl overflow-hidden bg-gray-100">
          {/* Replace src with course.image if available */}
          <img
            src="https://placehold.co/600x200"
            alt={course.title}
            className="object-cover w-full h-32 sm:h-40 md:h-48"
          />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-5 flex-1">
        <div className="flex-1">
          <CardTitle>{course.title}</CardTitle>
          <CardDescription>
            {course.category}
            <span className="ml-2 text-xs text-muted-foreground">
              {/* Course group (placeholder) */}
              Group: <span className="font-medium">A</span>
            </span>
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant={course.status === "active" ? "default" : "secondary"}
            className={
              course.status === "active"
                ? "bg-green-100 text-green-600 border-none"
                : "bg-gray-200 text-gray-600 border-none"
            }
          >
            {course.status}
          </Badge>
          {/* Recurrent rule (placeholder) */}
          <span className="text-xs text-muted-foreground ml-2">
            Repeats: <span className="font-medium">Weekly</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          {/* Number of students (placeholder) */}
          <span className="text-sm text-muted-foreground">
            <span className="font-semibold">24</span> students
          </span>
        </div>
        <div className="mt-auto flex gap-2">
          <Button
            className="px-3 py-1 rounded-md text-sm font-medium border border-gray-200 bg-white text-gray-900 hover:bg-gray-50 transition dark:bg-gray-900 dark:text-white dark:border-gray-700 dark:hover:bg-gray-800"
          >
            More Info
          </Button>
          <Button
            className="px-3 py-1 rounded-md text-sm font-medium bg-primary text-white hover:bg-primary/90 transition"
          >
            Enroll
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
