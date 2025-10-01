"use client";

import { ReactNode } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface SkeletonCellProps {
  /**
   * The item to check for skeleton status
   */
  item: unknown;
  /**
   * Content to render when not skeleton
   */
  children: ReactNode;
  /**
   * Height class for skeleton (e.g., "h-4", "h-8")
   */
  skeletonHeight?: string;
  /**
   * Width class for skeleton (e.g., "w-full", "w-20")
   */
  skeletonWidth?: string;
  /**
   * Additional skeleton className
   */
  skeletonClassName?: string;
}

/**
 * Utility component để handle skeleton rendering trong table cells
 * Usage: <SkeletonCell item={row.original}><YourContent /></SkeletonCell>
 */
export function SkeletonCell({
  item,
  children,
  skeletonHeight = "h-4",
  skeletonWidth = "w-full",
  skeletonClassName,
}: SkeletonCellProps) {
  // Check if item is skeleton
  const isSkeletonItem = (obj: unknown): boolean => {
    return (
      obj !== null &&
      typeof obj === "object" &&
      "__skeleton" in obj &&
      (obj as { __skeleton: boolean }).__skeleton === true
    );
  };

  if (isSkeletonItem(item)) {
    return (
      <Skeleton
        className={cn(skeletonHeight, skeletonWidth, skeletonClassName)}
      />
    );
  }

  return <>{children}</>;
}
