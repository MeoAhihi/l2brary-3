import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { CalendarIcon, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/multi-selector";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DATE_FNS_DD_MM_YYYY_FORMAT } from "@/lib/datetime";
import { cn } from "@/lib/utils";

import { FieldRenderer } from "./types/base.types";

/**
 * Default field renderer with comprehensive field type support
 */
export const defaultFieldRenderer: FieldRenderer = (fieldConfig, rhfField) => {
  const { type, placeholder, options, className } = fieldConfig;

  switch (type) {
    case "textarea":
      return (
        <Textarea
          placeholder={placeholder}
          className={cn("resize-none", className)}
          {...rhfField}
          value={rhfField.value ?? ""}
        />
      );
    case "number":
      return (
        <Input
          type="number"
          placeholder={placeholder}
          {...rhfField}
          value={rhfField.value ?? ""}
          onChange={(e) => {
            const value = e.target.value;
            rhfField.onChange(value === "" ? undefined : Number(value));
          }}
        />
      );

    case "select":
      return (
        <Select
          onValueChange={rhfField.onChange}
          value={rhfField.value ?? ""}
          defaultValue={rhfField.value ?? ""}
        >
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {options?.map((option, index) => (
              <SelectItem key={index} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );

    case "multiselect":
      return (
        <MultiSelector
          values={rhfField.value || []}
          onValuesChange={rhfField.onChange}
          loop={false}
        >
          <MultiSelectorTrigger className="border-input border">
            <MultiSelectorInput placeholder={placeholder} className="text-sm" />
          </MultiSelectorTrigger>
          <MultiSelectorContent className="w-sm lg:w-sm">
            <MultiSelectorList>
              {options?.map((option, index) => (
                <MultiSelectorItem
                  key={index}
                  value={option.value}
                  label={option.label}
                >
                  {option.label}
                </MultiSelectorItem>
              ))}
            </MultiSelectorList>
          </MultiSelectorContent>
        </MultiSelector>
      );

    case "checkbox":
      return (
        <Checkbox
          checked={rhfField.value}
          onCheckedChange={rhfField.onChange}
        />
      );

    case "radio":
      return (
        <RadioGroup
          onValueChange={rhfField.onChange}
          value={rhfField.value ?? ""}
          defaultValue={rhfField.value ?? ""}
          className="flex flex-col space-y-1"
        >
          {options?.map((option, index) => (
            <FormItem
              key={index}
              className="flex items-center space-y-0 space-x-3"
            >
              <FormControl>
                <RadioGroupItem
                  value={option.value}
                  id={`${rhfField.name}-${option.value}`}
                />
              </FormControl>
              <FormLabel
                htmlFor={`${rhfField.name}-${option.value}`}
                className="font-normal"
              >
                {option.label}
              </FormLabel>
            </FormItem>
          ))}
        </RadioGroup>
      );

    case "date":
      const dateValue =
        rhfField.value instanceof Date
          ? rhfField.value
          : rhfField.value
            ? new Date(rhfField.value)
            : null;

      return (
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant="outline"
                className={cn(
                  "w-[240px] pl-3 text-left font-normal",
                  !dateValue && "text-muted-foreground",
                )}
              >
                {dateValue ? (
                  format(dateValue, DATE_FNS_DD_MM_YYYY_FORMAT, { locale: vi })
                ) : (
                  <span>{placeholder ?? "Pick a date"}</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={dateValue}
              onSelect={rhfField.onChange}
              locale={vi}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      );

    case "multidate":
      return (
        <div className="space-y-3">
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !rhfField.value?.length && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {rhfField.value?.length > 0 ? (
                    `${rhfField.value.length} date${rhfField.value.length > 1 ? "s" : ""} selected`
                  ) : (
                    <span>{placeholder ?? "Select dates"}</span>
                  )}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <div className="space-y-3 p-3">
                <Calendar
                  mode="multiple"
                  selected={rhfField.value || []}
                  onSelect={rhfField.onChange}
                  locale={vi}
                  initialFocus
                />
                {rhfField.value?.length > 0 && (
                  <div className="flex items-center justify-between border-t pt-3">
                    <span className="text-muted-foreground text-sm">
                      {rhfField.value.length} date
                      {rhfField.value.length > 1 ? "s" : ""} selected
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => rhfField.onChange([])}
                    >
                      Clear all
                    </Button>
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>

          {rhfField.value?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {rhfField.value.map((date: Date, index: number) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {format(date, "MMM dd, yyyy")}
                  <button
                    type="button"
                    onClick={() => {
                      const newDates = rhfField.value.filter(
                        (_: Date, i: number) => i !== index,
                      );
                      rhfField.onChange(newDates);
                    }}
                    className="hover:bg-destructive hover:text-destructive-foreground ml-1 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      );

    default:
      return (
        <Input
          placeholder={placeholder}
          type={type}
          className={className}
          {...rhfField}
          value={rhfField.value ?? ""}
        />
      );
  }
};
