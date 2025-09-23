"use client";

import { Metadata } from "next";
import React, { useState } from "react";
import { Course } from "@/types/ld.types";
import ThumbnailHeader from "./ThumbnailHeader";
import CourseDescriptionSection from "./CourseDescriptionSection";
import CourseInfoSection from "./CourseInfoSection";
import CourseModulesSection from "./CourseModulesSection";
import { toast } from "sonner";

// export const metadata: Metadata = {
//   title: "Course Details | L2brary",
//   description: "View course details and request enrollment",
// };

interface CoursePageProps {
  params: Promise<{
    "course-id": string;
  }>;
}

// Mock data - in a real app, this would come from an API
const mockCourse: Course = {
  id: "course-101",
  thumbnail: "https://picsum.photos/800/400",
  title: "Introduction to Programming",
  description:
    "Learn the basics of programming using Python. This comprehensive course covers fundamental programming concepts, data structures, algorithms, and best practices. Perfect for beginners who want to start their programming journey. You'll build real projects and gain hands-on experience with industry-standard tools and techniques.",
  classGroup: "Programming",
  recurrentRule: "Thứ 2, Thứ 4 hàng tuần",
  time: "09:00 - 11:00",
  studentsCount: 42,
  maxStudents: 50,
  externalChatUrl: "https://t.me/programming_course_101",
  modules: [
    {
      id: "module-1",
      title: "Giới thiệu về lập trình",
      description: "Tìm hiểu các khái niệm cơ bản về lập trình và Python",
      duration: "2 tuần",
      isCompleted: false,
      lessons: [
        {
          id: "lesson-1-1",
          title: "Lập trình là gì?",
          duration: "15 phút",
          type: "video",
          isCompleted: false,
        },
        {
          id: "lesson-1-2",
          title: "Cài đặt Python và môi trường phát triển",
          duration: "20 phút",
          type: "video",
          isCompleted: false,
        },
        {
          id: "lesson-1-3",
          title: "Bài tập: Viết chương trình đầu tiên",
          duration: "30 phút",
          type: "assignment",
          isCompleted: false,
        },
      ],
    },
    {
      id: "module-2",
      title: "Biến và kiểu dữ liệu",
      description:
        "Học cách sử dụng biến và các kiểu dữ liệu cơ bản trong Python",
      duration: "1 tuần",
      isCompleted: false,
      lessons: [
        {
          id: "lesson-2-1",
          title: "Biến trong Python",
          duration: "18 phút",
          type: "video",
          isCompleted: false,
        },
        {
          id: "lesson-2-2",
          title: "Kiểu dữ liệu cơ bản",
          duration: "25 phút",
          type: "reading",
          isCompleted: false,
        },
        {
          id: "lesson-2-3",
          title: "Quiz: Biến và kiểu dữ liệu",
          duration: "15 phút",
          type: "quiz",
          isCompleted: false,
        },
      ],
    },
    {
      id: "module-3",
      title: "Cấu trúc điều khiển",
      description:
        "Tìm hiểu về if/else, vòng lặp và logic điều khiển chương trình",
      duration: "2 tuần",
      isCompleted: false,
      lessons: [
        {
          id: "lesson-3-1",
          title: "Câu lệnh if/else",
          duration: "22 phút",
          type: "video",
          isCompleted: false,
        },
        {
          id: "lesson-3-2",
          title: "Vòng lặp for và while",
          duration: "28 phút",
          type: "video",
          isCompleted: false,
        },
        {
          id: "lesson-3-3",
          title: "Bài tập: Xây dựng máy tính đơn giản",
          duration: "45 phút",
          type: "assignment",
          isCompleted: false,
        },
      ],
    },
  ],
};

export default function CoursePage({ params }: CoursePageProps) {
  const { "course-id": courseId } = React.use(params);
  const [isRequesting, setIsRequesting] = useState(false);

  // In a real app, you would fetch the course data based on courseId
  const course = mockCourse;

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
