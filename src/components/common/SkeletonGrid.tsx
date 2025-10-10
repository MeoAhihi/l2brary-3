"use client";

import { memo } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { DEFAULT_PAGE_SIZE } from "@/constants/common";
import { cn } from "@/lib/utils";

interface SkeletonGridProps {
  count?: number;
  className?: string;
  skeletonClassName?: string;
}

const SkeletonGridComponent = ({
  count = DEFAULT_PAGE_SIZE,
  className,
  skeletonClassName,
}: SkeletonGridProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton
          key={index}
          className={cn("h-64 w-full", skeletonClassName)}
        />
      ))}
    </div>
  );
};

export const SkeletonGrid = memo(SkeletonGridComponent);

SkeletonGrid.displayName = "SkeletonGrid";
