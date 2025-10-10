import { FieldValues } from "react-hook-form";

import CustomForm from "../custom/CustomForm";
import { SkeletonForm } from "../skeleton";
import { BaseFormProps } from "../types/base.types";

interface EnhancedCustomFormProps<T extends FieldValues>
  extends BaseFormProps<T> {
  /**
   * Show skeleton loading state instead of form
   */
  isLoading?: boolean;
  /**
   * Custom skeleton component to render during loading
   */
  skeleton?: React.ReactNode;
  /**
   * Skeleton configuration when using default skeleton
   */
  skeletonConfig?: {
    fieldCount?: number;
    showDescriptions?: boolean;
    showSubmitButton?: boolean;
  };
}

/**
 * Enhanced CustomForm with built-in skeleton loading state support
 */
export default function EnhancedCustomForm<T extends FieldValues>({
  isLoading = false,
  skeleton,
  skeletonConfig,
  ...formProps
}: EnhancedCustomFormProps<T>) {
  // Show loading skeleton
  if (isLoading) {
    if (skeleton) {
      return <>{skeleton}</>;
    }

    // Generate field types from form fields for accurate skeleton
    // Filter out field groups and flatten individual fields
    const fieldTypes = formProps.fields?.flatMap((field) => {
      if ("type" in field && field.type === "group") {
        return field.fields.map((f) => f.type);
      }
      return field.type;
    });

    return (
      <SkeletonForm
        fieldTypes={fieldTypes}
        fieldCount={skeletonConfig?.fieldCount || formProps.fields?.length}
        showDescriptions={skeletonConfig?.showDescriptions ?? true}
        showSubmitButton={skeletonConfig?.showSubmitButton ?? true}
        className={formProps.className}
      />
    );
  }

  // Show actual form
  return <CustomForm {...formProps} />;
}
