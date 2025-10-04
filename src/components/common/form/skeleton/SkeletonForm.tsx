import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

import { FormFieldConfig } from "..";
import { FieldType } from "../types";
import { SkeletonField } from "./SkeletonField";

interface SkeletonFormProps {
  /**
   * Number of fields to render as skeletons
   * @default 5
   */
  fieldCount?: number;
  /**
   * Array of field types to render. If not provided, will use default mix
   */
  fieldTypes?: FieldType[];
  /**
   * Array of field configurations for more precise skeleton rendering
   */
  fieldConfigs?: Partial<FormFieldConfig>[];
  /**
   * Form container className
   */
  className?: string;
  /**
   * Show submit button skeleton
   * @default true
   */
  showSubmitButton?: boolean;
  /**
   * Show field descriptions
   * @default false
   */
  showDescriptions?: boolean;
}

/**
 * Default field type mix for realistic form skeleton
 */
const DEFAULT_FIELD_TYPES: FieldType[] = [
  "text",
  "select",
  "textarea",
  "email",
  "date",
];

export function SkeletonForm({
  fieldCount = 5,
  fieldTypes,
  fieldConfigs,
  className = "space-y-8 max-w-3xl mx-auto py-10",
  showSubmitButton = true,
  showDescriptions = false,
}: SkeletonFormProps) {
  // Generate field types array
  const getFieldTypes = (): FieldType[] => {
    if (fieldTypes) return fieldTypes;

    if (fieldConfigs) {
      return fieldConfigs.map((config) => config.type || "text");
    }

    // Generate default field types
    const types: FieldType[] = [];
    for (let i = 0; i < fieldCount; i++) {
      types.push(DEFAULT_FIELD_TYPES[i % DEFAULT_FIELD_TYPES.length]);
    }
    return types;
  };

  const fieldsToRender = getFieldTypes();

  return (
    <div className={cn(className)}>
      {/* Form Title Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {fieldsToRender.map((fieldType, index) => (
          <SkeletonField
            key={index}
            type={fieldType}
            showDescription={showDescriptions}
            className="animate-pulse"
          />
        ))}
      </div>

      {/* Submit Button Skeleton */}
      {showSubmitButton && (
        <div className="flex justify-start">
          <Skeleton className="h-10 w-24" />
        </div>
      )}
    </div>
  );
}

/**
 * Preset skeleton forms for common use cases
 */
export const FormSkeletons = {
  /**
   * Basic contact form skeleton
   */
  Contact: () => (
    <SkeletonForm
      fieldTypes={["text", "email", "textarea"]}
      showSubmitButton={true}
      showDescriptions={false}
    />
  ),

  /**
   * Course creation form skeleton
   */
  CourseCreation: () => (
    <SkeletonForm
      fieldTypes={[
        "text",
        "textarea",
        "select",
        "select",
        "date",
        "select",
        "text",
      ]}
      showSubmitButton={true}
      showDescriptions={true}
    />
  ),

  /**
   * User profile form skeleton
   */
  UserProfile: () => (
    <SkeletonForm
      fieldTypes={[
        "text",
        "text",
        "email",
        "select",
        "date",
        "textarea",
        "multiselect",
      ]}
      showSubmitButton={true}
      showDescriptions={false}
    />
  ),

  /**
   * Event scheduling form skeleton
   */
  EventScheduling: () => (
    <SkeletonForm
      fieldTypes={[
        "text",
        "textarea",
        "multidate",
        "select",
        "checkbox",
        "text",
      ]}
      showSubmitButton={true}
      showDescriptions={true}
    />
  ),

  /**
   * Simple login form skeleton
   */
  Login: () => (
    <SkeletonForm
      fieldTypes={["email", "password"]}
      fieldCount={2}
      showSubmitButton={true}
      showDescriptions={false}
      className="mx-auto max-w-md space-y-4 py-8"
    />
  ),
};
