import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

import { FieldType } from "../types";

interface SkeletonFieldProps {
  type: FieldType;
  className?: string;
  showDescription?: boolean;
}

export function SkeletonField({
  type,
  className,
  showDescription = false,
}: SkeletonFieldProps) {
  const renderFieldSkeleton = () => {
    switch (type) {
      case "textarea":
        return <Skeleton className="h-20 w-full" />;

      case "select":
      case "multiselect":
        return (
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            {type === "multiselect" && (
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-14" />
              </div>
            )}
          </div>
        );

      case "checkbox":
        return (
          <div className="flex items-center space-x-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-24" />
          </div>
        );

      case "radio":
        return (
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        );

      case "date":
        return (
          <div className="space-y-2">
            <Skeleton className="h-10 w-60" />
          </div>
        );

      case "multidate":
        return (
          <div className="space-y-3">
            <Skeleton className="h-10 w-full" />
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-28" />
              <Skeleton className="h-6 w-20" />
            </div>
          </div>
        );

      case "number":
        return <Skeleton className="h-10 w-32" />;

      case "email":
      case "password":
        return <Skeleton className="h-10 w-full max-w-md" />;

      default: // text and others
        return <Skeleton className="h-10 w-full" />;
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {/* Field Label */}
      <Skeleton className="h-4 w-24" />
      {/* Field Input */}
      {renderFieldSkeleton()}
      {/* Field Description */}
      {showDescription && <Skeleton className="h-3 w-48" />}
      {/* Error Message Placeholder */}
      <div className="h-4" /> {/* Reserve space for error messages */}
    </div>
  );
}
