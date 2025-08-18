import { Metadata } from "next";
import React from "react";


export const metadata: Metadata = {
  title: "Course Details | L2brary",
  description: "View course details and request enrollment",
};

interface CoursePageProps {
  params: Promise<{
    "course-id": string;
  }>;
}

export default function CoursePage({ params }: CoursePageProps) {
  const { "course-id": courseId } = React.use(params);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Course Details</h1>
        <p className="text-muted-foreground mb-8">
          Course ID: {courseId}
        </p>

        {/* Course details will be implemented here */}
        <div className="space-y-6">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Course Information</h3>
            <p className="text-sm text-muted-foreground">
              Course details component will be implemented here
            </p>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Request to Enroll</h3>
            <p className="text-sm text-muted-foreground">
              Enrollment request button will be implemented here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
