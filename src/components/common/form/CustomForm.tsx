"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { cn } from "@/lib/utils";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { generateSchema } from "./helpers";
import { FormFieldConfig, CustomFormProps } from "./types";

// Render field based on type
function renderField(field: FormFieldConfig, form: any) {
  const { name, type, placeholder, options, className } = field;

  switch (type) {
    case "textarea":
      return (
        <Textarea
          placeholder={placeholder}
          className={cn("resize-none", className)}
        />
      );

    case "select":
      return (
        <Select onValueChange={form.setValue.bind(null, name)}>
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );

    case "checkbox":
      return <Checkbox />;

    case "radio":
      return (
        <RadioGroup onValueChange={form.setValue.bind(null, name)}>
          {options?.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem
                value={option.value}
                id={`${name}-${option.value}`}
              />
              <label
                htmlFor={`${name}-${option.value}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {option.label}
              </label>
            </div>
          ))}
        </RadioGroup>
      );

    default:
      return (
        <Input placeholder={placeholder} type={type} className={className} />
      );
  }
}

export default function CustomForm({
  fields,
  onSubmit,
  submitButtonText = "Submit",
  submitButtonVariant = "default",
  className = "space-y-8 max-w-3xl mx-auto py-10",
  defaultValues = {},
  showSuccessToast = true,
  showErrorToast = true,
}: CustomFormProps) {
  const schema = generateSchema(fields);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  async function handleSubmit(values: z.infer<typeof schema>) {
    try {
      await onSubmit(values);

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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={className}>
        {fields.map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name as any}
            render={({}) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>{renderField(field, form)}</FormControl>
                {field.description && (
                  <FormDescription>{field.description}</FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit" variant={submitButtonVariant}>
          {submitButtonText}
        </Button>
      </form>
    </Form>
  );
}
