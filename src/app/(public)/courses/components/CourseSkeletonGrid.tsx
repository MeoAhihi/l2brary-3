"use client";

import { memo } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface CourseSkeletonGridProps {
  count?: number;
  className?: string;
}

const CourseSkeletonGridComponent = ({
  count = 8,
  className,
}: CourseSkeletonGridProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} className="h-64 w-full" />
      ))}
    </div>
  );
};

export const CourseSkeletonGrid = memo(CourseSkeletonGridComponent);

CourseSkeletonGrid.displayName = "CourseSkeletonGrid";
