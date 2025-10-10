"use client";

import { Control, useWatch } from "react-hook-form";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RECURRENT_OPTIONS } from "@/constants/course";

import { CourseSettingsFormValues } from "../schema";
import { DynamicScheduleField } from "./DynamicScheduleField";

interface CourseScheduleFormProps {
  control: Control<CourseSettingsFormValues>;
}

export function CourseScheduleForm({ control }: CourseScheduleFormProps) {
  const scheduleType = useWatch({
    control,
    name: "scheduleType",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lịch Trình Khóa Học</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={control}
            name="scheduleType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loại Lịch Trình</FormLabel>
                <Select
                  key={field.value}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn một loại" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {RECURRENT_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <DynamicScheduleField control={control} scheduleType={scheduleType} />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giờ Bắt Đầu</FormLabel>
                <FormControl>
                  <Input type="time" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="endTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giờ Kết Thúc</FormLabel>
                <FormControl>
                  <Input type="time" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ngày Bắt Đầu</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ngày Kết Thúc</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={control}
            name="maxStudents"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số Học Viên Tối Đa</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Nhập số học viên tối đa"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="enrollmentDeadlineDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hạn Chót Đăng Ký</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
