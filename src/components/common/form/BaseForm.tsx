import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { defaultFieldRenderer } from "./fieldRenderer";
import {
  BaseFieldConfig,
  BaseFormProps,
  FieldGroupConfig,
  FormFieldConfig,
} from "./types/base.types";

/**
 * BaseForm - Generic form component that can be extended by other form types
 *
 * Provides core form functionality including:
 * - Comprehensive field type rendering
 * - Form validation and submission
 * - Error and success handling
 * - Customizable field rendering
 */
export default function BaseForm<T extends FieldValues>({
  form,
  fields,
  onSubmitAction,
  submitButtonText = "Submit",
  className = "space-y-8 max-w-3xl mx-auto py-10",
  showSuccessToast = true,
  showErrorToast = true,
  isSubmitting = false,
}: BaseFormProps<T>) {
  /**
   * Handle form submission with error handling and toast notifications
   */
  async function handleSubmit(values: T) {
    try {
      await onSubmitAction(values);

      if (showSuccessToast) {
        toast.success("Form submitted successfully!");
      }
    } catch (error) {
      console.error("Form submission error", error);

      if (showErrorToast) {
        toast.error("Failed to submit the form. Please try again.");
      }
    }
  }

  /**
   * Render individual form field with custom or default renderer
   */
  function renderFormField(configField: BaseFieldConfig) {
    return (
      <FormField
        key={configField.name}
        control={form.control}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        name={configField.name as any}
        render={({ field: rhfField }) => (
          <FormItem>
            <FormLabel>{configField.label}</FormLabel>
            <FormControl>
              {configField.render
                ? configField.render(rhfField)
                : defaultFieldRenderer(configField, rhfField)}
            </FormControl>
            {configField.description && (
              <FormDescription>{configField.description}</FormDescription>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  /**
   * Render field group with layout control
   */
  function renderFieldGroup(groupConfig: FieldGroupConfig, index: number) {
    const {
      fields: groupFields,
      className = "",
      layout = "horizontal",
      gridCols = 2,
      description,
    } = groupConfig;

    // Define layout classes
    const layoutClasses = {
      horizontal: "flex flex-wrap gap-4",
      grid: `grid grid-cols-${gridCols} gap-4`,
    };

    return (
      <div key={`group-${index}`} className="space-y-2">
        {description && (
          <FormDescription className="muted-foreground text-sm">
            {description}
          </FormDescription>
        )}
        <div className={`${layoutClasses[layout]} ${className}`}>
          {groupFields.map((field) => renderFormField(field))}
        </div>
      </div>
    );
  }

  /**
   * Render form field or field group based on type
   */
  function renderFormElement(config: FormFieldConfig, index: number) {
    // Type guard to check if it's a field group
    if ("type" in config && config.type === "group") {
      return renderFieldGroup(config as FieldGroupConfig, index);
    }

    // Otherwise, render as individual field
    return renderFormField(config as BaseFieldConfig);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={className}>
        <fieldset disabled={isSubmitting} className="space-y-4">
          {fields.map((config, index) => renderFormElement(config, index))}
        </fieldset>
        <Button type="submit" disabled={isSubmitting}>
          {submitButtonText}
        </Button>
      </form>
    </Form>
  );
}

/**
 * Export field renderer for use in custom form implementations
 */
export { defaultFieldRenderer as renderField };
