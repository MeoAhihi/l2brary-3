import { Suspense } from "react";

import { CourseWrapper } from "./components/CourseWrapper";
import { CourseProvider } from "./contexts";

export const metadata = {
  title: "Courses | L2brary",
  description: "Browse available courses and learning opportunities",
};

export default function CoursesPage() {
  return (
    <CourseProvider>
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-6 text-3xl font-bold">Courses</h1>
          <p className="text-muted-foreground mb-8">
            Discover and enroll in courses to enhance your skills
          </p>
          <Suspense>
            <CourseWrapper />
          </Suspense>
        </div>
      </div>
    </CourseProvider>
  );
}
