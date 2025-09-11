"use client";

import { Button } from "@/components/ui/button";
import PageHeader from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Course } from "@/types/ld.types";

interface ThumbnailHeaderProps {
  course: Course;
  onRequestJoin?: () => void;
  isRequesting?: boolean;
}

export default function ThumbnailHeader({ 
  course, 
  onRequestJoin, 
  isRequesting = false 
}: ThumbnailHeaderProps) {
  return (
    <div className="relative">
      {/* Thumbnail Image */}
      <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg mb-6">
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Course Group Badge */}
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="bg-white/90 text-black">
            {course.classGroup}
          </Badge>
        </div>
      </div>

      {/* Page Header with Title and Description */}
      <PageHeader
        pageTitle={course.title}
        descriptions={[course.classGroup]}
      >
        {/* CTA Button */}
        <Button 
          onClick={onRequestJoin}
          disabled={isRequesting}
          size="lg"
          className="bg-primary hover:bg-primary/90"
        >
          {isRequesting ? "Đang gửi yêu cầu..." : "Yêu cầu tham gia khóa học"}
        </Button>
      </PageHeader>
    </div>
  );
}
