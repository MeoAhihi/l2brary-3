import { ReactNode } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { LabelValue } from "@/types/common";

/**
 * Supported field types for form rendering
 */
export type FieldType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "textarea"
  | "select"
  | "multiselect"
  | "checkbox"
  | "radio"
  | "date"
  | "multidate";

/**
 * Base field configuration interface
 */
export interface BaseFieldConfig {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  description?: string;
  options?: LabelValue[];
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
  render?: (field: any) => ReactNode;
  validation?: z.ZodTypeAny;
  required?: boolean;
}

/**
 * Field group configuration for layout control
 */
export interface FieldGroupConfig {
  type: "group";
  fields: BaseFieldConfig[];
  className?: string;
  layout?: "horizontal" | "grid";
  gridCols?: number;
  description?: string;
}

/**
 * Union type for field or field group configurations
 */
export type FormFieldConfig = BaseFieldConfig | FieldGroupConfig;

/**
 * Base form props interface that all form components should extend
 */
export interface BaseFormProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  fields: FormFieldConfig[];
  // eslint-disable-next-line no-unused-vars
  onSubmitAction: (values: T) => void | Promise<void>;
  submitButtonText?: ReactNode;
  className?: string;
  showSuccessToast?: boolean;
  showErrorToast?: boolean;
  isSubmitting?: boolean;
}

/**
 * Base form component interface for extension
 */
export interface FormComponent<T extends FieldValues = FieldValues> {
  // eslint-disable-next-line no-unused-vars
  (props: BaseFormProps<T>): ReactNode;
}

/**
 * Form field renderer function type
 */
export type FieldRenderer = (
  // eslint-disable-next-line no-unused-vars
  fieldConfig: BaseFieldConfig,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
  rhfField: any,
) => ReactNode;
