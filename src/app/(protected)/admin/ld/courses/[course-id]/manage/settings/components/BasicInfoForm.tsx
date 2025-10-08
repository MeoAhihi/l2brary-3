"use client";

import { Control } from "react-hook-form";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { DIFFICULTY_OPTIONS } from "../../../../constants";
import { useGetCourseGroup } from "../../../../hooks/useGetCourseGroup";
import { CourseSettingsFormValues } from "../schema";

interface BasicInfoFormProps {
  control: Control<CourseSettingsFormValues>;
}

export function BasicInfoForm({ control }: BasicInfoFormProps) {
  const { data: courseGroups, isLoading: isLoadingCourseGroups } =
    useGetCourseGroup({
      onError: (error) => {
        toast.error("Không thể tải danh mục khóa học: " + error.message);
      },
    });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông Tin Cơ Bản</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên Khóa Học</FormLabel>
              <FormControl>
                <Input placeholder="Nhập tên khóa học" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mô Tả</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Nhập mô tả chi tiết cho khóa học"
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={control}
            name="difficulty"
            render={({ field }) => (
              <FormItem>
                <Select
                  key={field.value}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn mức độ" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {DIFFICULTY_OPTIONS.map((option) => (
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

          <FormField
            control={control}
            name="group"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Danh Mục</FormLabel>
                <Select
                  key={field.value}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn một danh mục" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {isLoadingCourseGroups ? (
                      <SelectItem value="loading" disabled>
                        Đang tải...
                      </SelectItem>
                    ) : (
                      courseGroups?.map((group) => (
                        <SelectItem key={group} value={group}>
                          {group}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name="thumbnail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL Ảnh Bìa</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/image.png" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="chatGroupUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL Nhóm Chat</FormLabel>
              <FormControl>
                <Input placeholder="https://zalo.me/g/..." {...field} />
              </FormControl>
              <FormDescription>
                Đường dẫn đến nhóm Zalo, Messenger, hoặc nhóm chat khác.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
