import { Control } from "react-hook-form";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";

import { CourseSettingsFormValues } from "../schema";

interface AccessVisibilityFormProps {
  control: Control<CourseSettingsFormValues>;
}

export function AccessVisibilityForm({ control }: AccessVisibilityFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Truy Cập & Hiển Thị</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={control}
          name="isPublic"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Khóa Học Công Khai</FormLabel>
                <FormDescription>
                  Cho phép mọi người xem và đăng ký khóa học này.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="isRequireApproval"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Yêu Cầu Phê Duyệt</FormLabel>
                <FormDescription>
                  Phê duyệt yêu cầu đăng ký thủ công.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="isAllowGuestAccess"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  Cho Phép Khách Truy Cập
                </FormLabel>
                <FormDescription>
                  Cho phép người dùng chưa đăng ký xem trước nội dung khóa học.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
