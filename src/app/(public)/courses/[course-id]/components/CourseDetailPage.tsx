"use client";

import { CourseItem } from "@/types/courses/response";

import { useEnrollmentButton } from "../hooks/useEnrollmentButton";
import CourseDescriptionSection from "./CourseDescriptionSection";
import CourseInfoSection from "./CourseInfoSection";
import ThumbnailHeader from "./ThumbnailHeader";

interface CourseDetailPageProps {
  course: CourseItem;
}

export default function CourseDetailPage({ course }: CourseDetailPageProps) {
  const { loading, label, handleClick } = useEnrollmentButton({
    course,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-6xl">
        {/* Thumbnail Header with CTA */}
        <ThumbnailHeader
          course={course}
          ctaLabel={label}
          ctaDisabled={loading}
          onCtaClick={handleClick}
        />

        {/* Main Content Grid */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column - Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Course Description */}
            <CourseDescriptionSection course={course} />

            {/* Course Modules */}
            {/* <CourseModulesSection course={course} /> */}
          </div>

          {/* Right Column - Course Info */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <CourseInfoSection course={course} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
