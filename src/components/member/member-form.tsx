"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  fullname: z.string().min(1), // delete require contraints
  isMale: z.enum(["male", "female", "other"]),
  birthday: z.coerce.date().optional(),
  email: z.string().email().optional(),
  phone_number: z.string().optional(),
  school_class: z.string().min(1).optional(),
  role: z.string().min(1).optional(),
});

export function MemberForm({ defaultValues }: any) {
  console.log("🚀 ~ MemberForm ~ defaultValues:", defaultValues)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: defaultValues?.name || "",
      isMale: "male", //defaultValues?.isMale || "",
      birthday: defaultValues?.birthday
        ? new Date(defaultValues?.birthday)
        : new Date(),
      email: defaultValues?.email || "",
      phone_number: defaultValues?.phone_number || "",
      school_class: defaultValues?.school_class || "",
      role: defaultValues?.role || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>,
      );
    } catch (error) {
      console.error("Lỗi Đăng ký", error);
      toast.error("Đăng ký không thành công. Vui lòng thử lại.");
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-100">
        <FormField
          control={form.control}
          name="fullname"
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
          name="isMale"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Giới tính</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  className="flex flex-col space-y-1"
                  defaultValue={
                    defaultValues
                      ? defaultValues.isMale
                        ? "male"
                        : "female"
                      : ""
                  }
                >
                  {[
                    ["Nam", "male"],
                    ["Nữ", "female"],
                    ["Khác", "other"],
                  ].map((option, index) => (
                    <FormItem
                      className="flex items-center space-x-3 space-y-0"
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
          name="birthday"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Ngày sinh</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
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
          name="phone_number"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel>Số điện thoại</FormLabel>
              <FormControl className="w-full">
                <PhoneInput
                  defaultValue="123456789"
                  placeholder="090-xxxx-xxx"
                  {...field}
                  defaultCountry="VN"
                />
              </FormControl>
              <FormDescription>Số điện thoại để kết bạn Zalo.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="school_class"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lớp học</FormLabel>
              <FormControl>
                <Input placeholder="12A3" type="text" {...field} />
              </FormControl>
              <FormDescription>Lớp học ở trường</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vai trò</FormLabel>
              <FormControl>
                <Input placeholder="Thành viên" type="text" {...field} />
              </FormControl>
              <FormDescription>
                Vị trí làm việc trong CLB (VD: Thành viên, Thiết kế, Diễn giả,
                ...)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Lưu thành viên
        </Button>
      </form>
    </Form>
  );
}
