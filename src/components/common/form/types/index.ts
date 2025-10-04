// Explicit type exports (types don't affect runtime bundle, so export * is OK here)
export type * from "./base.types";

// Legacy type aliases for backward compatibility
export type {
  BaseFieldConfig,
  BaseFormProps as CustomFormProps,
  FieldGroupConfig,
  FormFieldConfig,
} from "./base.types";
