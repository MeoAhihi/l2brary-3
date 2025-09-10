import { CourseCard } from "@/components/course/course-card";
import { Metadata } from "next";
import { useState } from "react";
import { PaginationButtons } from "@/components/ui/pagination-buttons";
import courses from "@/constants/courses.json";

export const metadata: Metadata = {
  title: "Courses | L2brary",
  description: "Browse available courses and learning opportunities",
};

export default function CoursesPage() {
  const pageSize = 8;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(courses.length / pageSize);
  const pagedCourses = courses.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Courses</h1>
        <p className="text-muted-foreground mb-8">
          Discover and enroll in courses to enhance your skills
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {pagedCourses.map((course) => (
            <CourseCard key={course.title} {...course} />
          ))}
        </div>
        <PaginationButtons
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
