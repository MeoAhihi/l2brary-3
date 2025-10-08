"use client";

import { Control } from "react-hook-form";

import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/multi-selector";
import { LabelValue } from "@/types/common";

import { CourseSettingsFormValues } from "../schema";

interface RecurrentRuleSelectorProps {
  control: Control<CourseSettingsFormValues>;
  name: keyof CourseSettingsFormValues;
  label: string;
  placeholder: string;
  options: readonly LabelValue[];
}

export function RecurrentRuleSelector({
  control,
  name,
  label,
  placeholder,
  options,
}: RecurrentRuleSelectorProps) {
  const valueToLabelValue = (value: string): LabelValue => {
    return options.find((o) => o.value === value) || { label: value, value };
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <MultiSelector
            values={
              Array.isArray(field.value)
                ? field.value.map(valueToLabelValue)
                : []
            }
            onValuesChange={(newValues) =>
              field.onChange(newValues.map((item) => item.value))
            }
          >
            <MultiSelectorTrigger>
              <MultiSelectorInput placeholder={placeholder} />
            </MultiSelectorTrigger>
            <MultiSelectorContent>
              <MultiSelectorList>
                {options.map((option) => (
                  <MultiSelectorItem
                    key={option.value}
                    value={option.value}
                    label={option.label}
                  >
                    {option.label}
                  </MultiSelectorItem>
                ))}
              </MultiSelectorList>
            </MultiSelectorContent>
          </MultiSelector>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
