"use client";

import React, { useState } from "react";
import { toast } from "sonner";

import { CourseItem as Course } from "../../types/response";
import CourseDescriptionSection from "./CourseDescriptionSection";
import CourseInfoSection from "./CourseInfoSection";
import CourseModulesSection from "./CourseModulesSection";
import ThumbnailHeader from "./ThumbnailHeader";

interface CourseDetailPageProps {
  course: Course;
}

export default function CourseDetailPage({ course }: CourseDetailPageProps) {
  const [isRequesting, setIsRequesting] = useState(false);

  const handleRequestJoin = async () => {
    setIsRequesting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast.success("Yêu cầu tham gia khóa học đã được gửi thành công!");
    setIsRequesting(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-6xl">
        {/* Thumbnail Header with CTA */}
        <ThumbnailHeader
          course={course}
          onRequestJoin={handleRequestJoin}
          isRequesting={isRequesting}
        />

        {/* Main Content Grid */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column - Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Course Description */}
            <CourseDescriptionSection course={course} />

            {/* Course Modules */}
            <CourseModulesSection course={course} />
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
