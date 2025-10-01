import React, { useMemo } from "react";

import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonItem {
  __skeleton: boolean;
  id: string;
}

/**
 * Utility hook để detect và handle skeleton items trong table
 */
export function useTableSkeleton() {
  /**
   * Check if an item is a skeleton placeholder
   */
  const isSkeletonItem = (item: unknown): item is SkeletonItem => {
    return (
      item !== null &&
      typeof item === "object" &&
      "__skeleton" in item &&
      (item as SkeletonItem).__skeleton === true
    );
  };

  /**
   * Create a skeleton cell component with specified dimensions
   */
  const SkeletonCell = useMemo(() => {
    const Component = ({
      height = "h-4",
      width = "w-full",
    }: {
      height?: string;
      width?: string;
    }) => React.createElement(Skeleton, { className: `${height} ${width}` });
    Component.displayName = "SkeletonCell";
    return Component;
  }, []);

  /**
   * Render content or skeleton based on item type
   */
  const renderCellContent = (
    item: unknown,
    renderFn: () => React.ReactNode,
    skeletonHeight = "h-4",
    skeletonWidth = "w-full",
  ): React.ReactNode => {
    if (isSkeletonItem(item)) {
      return React.createElement(SkeletonCell, {
        height: skeletonHeight,
        width: skeletonWidth,
      });
    }
    return renderFn();
  };

  /**
   * Get skeleton-safe value from item property
   */
  const getSkeletonSafeValue = <T = string>(
    item: unknown,
    property: string,
    defaultValue: T,
  ): T => {
    if (isSkeletonItem(item)) {
      return defaultValue;
    }
    return ((item as Record<string, unknown>)?.[property] as T) ?? defaultValue;
  };

  return {
    isSkeletonItem,
    SkeletonCell,
    renderCellContent,
    getSkeletonSafeValue,
  };
}
