"use client";

import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/ui/page-header";
import { CourseItem } from "@/types/courses/response";

interface ThumbnailHeaderProps {
  course: CourseItem;
  ctaLabel: string;
  ctaDisabled: boolean;
  onCtaClick: () => void;
}

export default function ThumbnailHeader({
  course,
  ctaLabel,
  ctaDisabled,
  onCtaClick,
}: ThumbnailHeaderProps) {
  return (
    <div className="relative">
      {/* Thumbnail Image */}
      <div className="relative mb-6 h-64 w-full overflow-hidden rounded-lg md:h-80 lg:h-96">
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
            {course.group}
          </Badge>
        </div>
      </div>

      {/* Page Header with Title and Description */}
      <PageHeader pageTitle={course.title} descriptions={[course.group]}>
        {/* CTA Button */}
        <Button
          onClick={onCtaClick}
          disabled={ctaDisabled}
          size="lg"
          className="bg-primary hover:bg-primary/90 cursor-pointer"
        >
          {ctaLabel}
        </Button>
      </PageHeader>
    </div>
  );
}
