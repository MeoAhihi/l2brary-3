"use client";

import { memo } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface DataTableSkeletonProps {
  /**
   * Number of skeleton rows to display
   */
  rowCount?: number;
  /**
   * Number of skeleton columns to display
   */
  columnCount?: number;
  /**
   * Show table header skeleton
   */
  showHeader?: boolean;
  /**
   * Show pagination skeleton
   */
  showPagination?: boolean;
  /**
   * Custom className for the container
   */
  className?: string;
  /**
   * Custom cell heights for different column types
   */
  cellHeights?: string[];
}

const DataTableSkeletonComponent = ({
  rowCount = 10,
  columnCount = 5,
  showHeader = true,
  showPagination = true,
  className,
  cellHeights = ["h-4", "h-4", "h-4", "h-6", "h-4"],
}: DataTableSkeletonProps) => {
  // Ensure we have enough cell heights for all columns
  const normalizedHeights = Array.from(
    { length: columnCount },
    (_, index) => cellHeights[index] || "h-4",
  );

  return (
    <div className={cn("w-full space-y-4", className)}>
      {/* Header Skeleton */}
      {showHeader && (
        <div className="flex w-full flex-col gap-3 px-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-64" />
            <Skeleton className="h-9 w-24" />
          </div>
        </div>
      )}

      {/* Table Skeleton */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {Array.from({ length: columnCount }).map((_, index) => (
                <TableHead key={index}>
                  <Skeleton className="h-4 w-full" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: rowCount }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {Array.from({ length: columnCount }).map((_, colIndex) => (
                  <TableCell key={colIndex}>
                    <Skeleton
                      className={cn("w-full", normalizedHeights[colIndex])}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Skeleton */}
      {showPagination && (
        <div className="flex items-center justify-between px-2">
          <Skeleton className="h-4 w-32" />
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
        </div>
      )}
    </div>
  );
};

export const DataTableSkeleton = memo(DataTableSkeletonComponent);

DataTableSkeleton.displayName = "DataTableSkeleton";
