import { CardContent } from "@/components/ui/card";
import { Course } from "@/lib/courses";
import CourseCard from "./course-card";

export default function CardGrid({ courses }: { courses: Course[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {courses.map((course) => (
        <CourseCard course={course} key={course.id} />
      ))}
    </div>
  );
}
