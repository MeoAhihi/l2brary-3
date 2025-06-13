"use client"

import {
  toast
} from "sonner"
import {
  useForm
} from "react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  cn
} from "@/lib/utils"
import {
  Button
} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Input
} from "@/components/ui/input"
import {
  RadioGroup
} from "@/components/ui/radio-group"
import {
  format
} from "date-fns"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import {
  Calendar
} from "@/components/ui/calendar"
import {
  Calendar as CalendarIcon
} from "lucide-react"
import {
  PhoneInput
} from "@/components/ui/phone-input";
import {
  PasswordInput
} from "@/components/ui/password-input"
import { RadioGroupItem } from "./ui/radio-group"
import Image from "next/image"

const formSchema = z.object({
  fullname: z.string().min(1), // delete require contraints
  gender: z.enum(["male", "female", "other"]),
  birthday: z.coerce.date(),
  email: z.string().email().optional(),
  phone_number: z.string().optional(),
  password: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự").regex(/\d/, "Mật khẩu phải có ít 1 chữ số"),
  confirm_password: z.string()
}).refine((data) => data.password === data.confirm_password, {
  message: "Mật khẩu không trùng khớp",
  path: ["confirm_password"],
});

export function SignupForm({ loginUrl = "/login", signupAction }: { loginUrl?: string, signupAction: (formData: FormData) => Promise<void> }) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      "birthday": new Date()
    },
  })


  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData()

    for (const [key, value] of Object.entries(values)) {
      if (value !== undefined) {
        formData.append(key, value as string)
      }
    }
    await signupAction(formData)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto">

        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Họ và Tên</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  // {...register("fullname")}
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
                >
                  {[
                    ["Nam", "male"],
                    ["Nữ", "female"],
                    ["Khác", "other"]
                  ].map((option, index) => (
                    <FormItem className="flex items-center space-x-3 space-y-0" key={index}>
                      <FormControl>
                        <RadioGroupItem value={option[1]} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {option[0]}
                      </FormLabel>
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
                        !field.value && "text-muted-foreground"
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
                  {...field} />
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mật khẩu</FormLabel>
              <FormControl>
                <PasswordInput placeholder="●●●●●●●●" {...field} />
              </FormControl>
              <FormDescription>Mật khẩu phải có ít nhất 8 ký tự và 1 chữ số</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="confirm_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Xác nhận mật khẩu</FormLabel>
              <FormControl>
                <PasswordInput placeholder="●●●●●●●●" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">Đăng ký</Button>
        <p>Hoặc đăng nhập với</p>
        <Button variant="outline" className="w-full">
          <Image src="/icons8-google.svg" alt="Google Icon" width={20} height={20} />
          Google
        </Button>
        <div className="mt-4 text-center text-sm">
          Đã có tài khoản?{" "}
          <a href={loginUrl} className="underline underline-offset-4">
            Đăng ký
          </a>
        </div>
      </form>
    </Form>
  )
}