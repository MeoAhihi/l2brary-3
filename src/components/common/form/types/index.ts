import { z } from "zod";

// Field types that can be rendered
export type FieldType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "textarea"
  | "select"
  | "checkbox"
  | "radio";

// Field configuration interface
export interface FormFieldConfig {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  validation?: z.ZodTypeAny;
  options?: { value: string; label: string }[]; // For select and radio fields
  description?: string;
  className?: string;
}

// Form configuration interface
export interface CustomFormProps {
  fields: FormFieldConfig[];
  onSubmit: (values: any) => void | Promise<void>;
  submitButtonText?: string;
  submitButtonVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  className?: string;
  defaultValues?: Record<string, any>;
  showSuccessToast?: boolean;
  showErrorToast?: boolean;
}
