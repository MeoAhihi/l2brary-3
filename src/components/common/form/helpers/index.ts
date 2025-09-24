// Helper function to generate Zod schema from field configs

import { z } from "zod";

import { FormFieldConfig } from "../types";

export function generateSchema(fields: FormFieldConfig[]): z.ZodObject<any> {
  const schemaObject: Record<string, z.ZodTypeAny> = {};

  fields.forEach((field) => {
    let fieldSchema: z.ZodTypeAny = z.string();

    // Apply validation based on field type
    switch (field.type) {
      case "email":
        fieldSchema = z.string().email("Invalid email address");
        break;
      case "number":
        fieldSchema = z.string().transform((val) => Number(val));
        break;
      case "textarea":
        fieldSchema = z.string();
        break;
      case "select":
        fieldSchema = z.string();
        break;
      case "checkbox":
        fieldSchema = z.boolean().default(false);
        break;
      case "radio":
        fieldSchema = z.string();
        break;
      default:
        fieldSchema = z.string();
    }

    // Apply required validation if specified
    if (field.required) {
      if (fieldSchema instanceof z.ZodString) {
        fieldSchema = fieldSchema.min(1, `${field.label} is required`);
      }
    } else {
      fieldSchema = fieldSchema.optional();
    }

    // Apply custom validation if provided
    if (field.validation) {
      fieldSchema = field.validation;
    }

    schemaObject[field.name] = fieldSchema;
  });

  return z.object(schemaObject);
}
