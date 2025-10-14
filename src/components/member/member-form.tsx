"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { adminModifyUserProfile } from "@/apis/user.api";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { invalidateQueries } from "@/lib/query-client";

// Rewritten schema: matches UpdateUserDto field names from @file_context_0
const formSchema = z.object({
  fullName: z.string().optional(),
  internationalName: z.string().optional(),
  gender: z.enum(["male", "female", "other"]).optional(),
  birthdate: z.coerce.date().optional(),
  email: z.string().email().optional(),
  phoneNumber: z.string().optional(),
  rank: z.string().optional(), // Added rank field
  // Add more fields here as needed to match backend DTO
});

export function MemberForm({ defaultValues }: any) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: defaultValues?.fullName || "",
      internationalName: defaultValues?.internationalName || "",
      gender: defaultValues?.gender ?? "male",
      birthdate: defaultValues?.birthdate
        ? new Date(defaultValues?.birthdate)
        : undefined,
      email: defaultValues?.email || "",
      phoneNumber: defaultValues?.phoneNumber || "",
      rank: defaultValues?.rank || "",
      // Add defaults for more fields if needed
    },
  });

  // UseUpdateUser

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Prepare payload for UpdateUserDto
      const payload = {
        ...values,
        birthdate: values.birthdate
          ? format(values.birthdate, "yyyy-MM-dd")
          : undefined,
      };

      // Optionally, get user id from defaultValues or props if needed
      // For now, assuming defaultValues.id is available
      const userId = defaultValues?.id;
      if (!userId) {
        toast.error("Không tìm thấy ID người dùng để cập nhật.");
        return;
      }

      // Call update API
      const resp = await adminModifyUserProfile(userId, payload);
      // Invalidate the users list query after updating user
      invalidateQueries.members();
      toast.success("Cập nhật thông tin thành viên thành công!");
      router.push("/admin/members");
      // Optionally, you can do other actions here, e.g., refresh page, etc.
    } catch (error) {
      console.error("Lỗi cập nhật thành viên", error);
      toast.error("Cập nhật thông tin không thành công. Vui lòng thử lại.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-100 space-y-8">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Họ và Tên</FormLabel>
              <FormControl>
                <Input placeholder="" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="internationalName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên quốc tế</FormLabel>
              <FormControl>
                <Input
                  placeholder="International Name (ví dụ: J. Doe)"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Giới tính</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  className="flex flex-col space-y-1"
                  value={field.value}
                >
                  {[
                    ["Nam", "male"],
                    ["Nữ", "female"],
                    ["Khác", "other"],
                  ].map((option, index) => (
                    <FormItem
                      className="flex items-center space-y-0 space-x-3"
                      key={index}
                    >
                      <FormControl>
                        <RadioGroupItem value={option[1]} />
                      </FormControl>
                      <FormLabel className="font-normal">{option[0]}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="birthdate"
          render={({ field }) => {
            // Format the field value to yyyy-mm-dd if it's a valid date
            const formattedValue = (() => {
              if (field.value) {
                const dateObj = new Date(field.value);
                if (!isNaN(dateObj.getTime())) {
                  const year = dateObj.getFullYear();
                  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
                  const day = String(dateObj.getDate()).padStart(2, "0");
                  return `${year}-${month}-${day}`;
                }
              }
              return field.value?.toString();
            })();
            return (
              <FormItem className="flex flex-col">
                <FormLabel>Ngày sinh</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    value={formattedValue}
                    className="w-[240px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="example@gmail.com"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel>Số điện thoại</FormLabel>
              <FormControl className="w-full">
                <Input
                  placeholder="Chỉ nhập số điện thoại"
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  {...field}
                  onChange={(e) => {
                    // Only allow numbers
                    const onlyNums = e.target.value.replace(/\D/g, "");
                    field.onChange(onlyNums);
                  }}
                />
              </FormControl>
              <FormDescription>Số điện thoại để kết bạn Zalo.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Add rank field */}
        <FormField
          control={form.control}
          name="rank"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rank</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nhập rank hoặc chức vụ (ví dụ: member, leader, etc.)"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Extend with more fields as needed in the future */}

        <Button type="submit" className="w-full">
          Lưu thành viên
        </Button>
      </form>
    </Form>
  );
}
