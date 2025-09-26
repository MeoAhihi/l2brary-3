"use client";

import Head from "next/head";
import { useState } from "react";

import { CourseCard } from "@/components/course/course-card";
import { PaginationButtons } from "@/components/ui/pagination-buttons";

export default function CoursesPage() {
  const pageSize = 8;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil([].length / pageSize);
  const pagedCourses = [].slice((page - 1) * pageSize, page * pageSize);

  return (
    <>
      <Head>
        <title>Courses | L2brary</title>
        <meta
          name="description"
          content="Browse available courses and learning opportunities"
        />
      </Head>
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-6 text-3xl font-bold">Courses</h1>
          <p className="text-muted-foreground mb-8">
            Discover and enroll in courses to enhance your skills
          </p>

          <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* {pagedCourses.map((course) => (
              <CourseCard key={course.title} {...course} />
            ))} */}
          </div>
          <PaginationButtons
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>
    </>
  );
}
