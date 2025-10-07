"use client";

import { Control } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  MONTHLY_RECURRENT_OPTIONS,
  WEEKLY_RECURRENT_OPTIONS,
} from "@/constants/course";
import { arrayObjectToCommaString, commaStringToArray } from "@/lib/format";
import { ScheduleTypeEnum } from "@/types/courses/type";

import { CourseSettingsFormValues } from "../schema";
import { RecurrentRuleSelector } from "./RecurrentRuleSelector";

interface DynamicScheduleFieldProps {
  control: Control<CourseSettingsFormValues>;
  scheduleType?: string;
}

export function DynamicScheduleField({
  control,
  scheduleType,
}: DynamicScheduleFieldProps) {
  switch (scheduleType) {
    case ScheduleTypeEnum.Weekly:
    case ScheduleTypeEnum.BiWeekly:
      return (
        <RecurrentRuleSelector
          control={control}
          name="recurrentRule"
          label="Các Ngày Trong Tuần"
          placeholder="Chọn các ngày"
          options={WEEKLY_RECURRENT_OPTIONS}
        />
      );

    case ScheduleTypeEnum.Monthly:
      return (
        <RecurrentRuleSelector
          control={control}
          name="recurrentRule"
          label="Các Ngày Trong Tháng"
          placeholder="Chọn các ngày"
          options={MONTHLY_RECURRENT_OPTIONS}
        />
      );

    case ScheduleTypeEnum.LunarMonthly:
      return (
        <FormField
          control={control}
          name="recurrentRule"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ngày Học (Âm Lịch)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nhập ngày âm lịch, ví dụ: 1, 15"
                  {...field}
                  value={arrayObjectToCommaString(field.value) ?? ""}
                  onChange={(e) =>
                    field.onChange(commaStringToArray(e.target.value))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );

    case ScheduleTypeEnum.OneTime:
      return (
        <FormField
          control={control}
          name="recurrentRule"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ngày Diễn Ra</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nhập ngày hoặc các ngày"
                  {...field}
                  value={arrayObjectToCommaString(field.value) ?? ""}
                  onChange={(e) =>
                    field.onChange(commaStringToArray(e.target.value))
                  }
                />
              </FormControl>
              <FormDescription>
                Đối với nhiều ngày, vui lòng nhập cách nhau bởi dấu phẩy.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      );

    default:
      return null;
  }
}
