"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Define fields dynamically

export default function DataForm({
  fields,
  onSubmit,
}: {
  fields: any[];
  onSubmit: (values: any) => void | Promise<void>;
}) {
  // Generate schema and default values dynamically
  const formSchema = z.object(
    fields.reduce(
      (schema, field) => {
        schema[field.name] = field.zodValidation;
        return schema;
      },
      {} as Record<string, z.ZodTypeAny>,
    ),
  );

  const formDefaultValues = fields.reduce(
    (defaults, field) => {
      defaults[field.name] = field.default;
      return defaults;
    },
    {} as Record<string, any>,
  );

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formDefaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {fields.map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>{field.input(formField)}</FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
