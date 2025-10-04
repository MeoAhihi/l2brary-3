// Base Form Components (explicit exports for optimal tree-shaking)
export { default as BaseForm } from "./BaseForm";
export { defaultFieldRenderer as renderField } from "./fieldRenderer";

// Form Components (direct path imports for best tree-shaking)
export { default as CustomForm } from "./custom/CustomForm";
export { default as EnhancedCustomForm } from "./enhanced/EnhancedCustomForm";

// Skeleton Components (explicit exports instead of export *)
export { SkeletonField } from "./skeleton/SkeletonField";
export { SkeletonForm } from "./skeleton/SkeletonForm";
export { FormSkeletons } from "./skeleton/SkeletonForm";

// Types (export * is OK for types - no runtime bundle impact)
export type * from "./types/base.types";

// Legacy type aliases for backward compatibility
export type { BaseFieldConfig as FormFieldConfig } from "./types/base.types";
export type { BaseFormProps as CustomFormProps } from "./types/base.types";

// Re-export for convenience (most commonly used)
export { default as Form } from "./custom/CustomForm";
export { SkeletonForm as FormSkeleton } from "./skeleton/SkeletonForm";
