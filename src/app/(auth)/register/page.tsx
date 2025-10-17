"use client";
import { cn } from "@/lib/utils";
import { Gender } from "@/types/gender.enum";
import { useState } from "react";
import { z, ZodSchema } from "zod";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { RegisterDto } from "@/types/auth/register.api.dto";
import { ArrowLeft, ArrowRight, UserPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "@/hooks/auth/use-register";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ControlledTabsDemo() {
  const [tab, setTab] = useState("1"); // 👈 state to track current tab

  const registerSchema = z
    .object({
      inviteCode: z.string().length(6, "mã mời không đúng"),
      fullName: z.string().min(1, "Họ và tên là bắt buộc"),
      internationalName: z.string().optional(),
      gender: z.nativeEnum(Gender, {
        errorMap: () => ({ message: "Giới tính là bắt buộc" }),
      }),
      birthdate: z
        .string()
        .optional()
        .refine(
          (val: string | undefined) => {
            if (!val || val === "") return true; // treat empty string as undefined
            const [d, m, y] = val.split("/");
            const birthdate = new Date(`${y}-${m}-${d}`);
            return !isNaN(birthdate.getTime()) && birthdate <= new Date();
          },
          { message: "Ngày sinh không hợp lệ" },
        )
        .transform((val) => (val === "" ? undefined : val)),
      phoneNumber: z
        .string()
        .min(1, "Số điện thoại là bắt buộc")
        .regex(/^(0\d{9,10}|\+84\d{9,10})$/, "Số điện thoại không hợp lệ"),
      email: z
        .string()
        .email("Email không hợp lệ")
        .optional()
        .or(z.literal("").transform(() => undefined)),
      password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
      confirmPassword: z.string().min(1, "Bạn cần xác nhận mật khẩu"),
    })
    .refine((data: any) => data.password === data.confirmPassword, {
      message: "Mật khẩu xác nhận không khớp",
      path: ["confirmPassword"],
    });

  const form = useForm<
    RegisterDto & { confirmPassword: string; inviteCode: string }
  >({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      fullName: "",
      internationalName: "",
      gender: undefined,
      birthdate: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      inviteCode: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const registerMutation = useRegister();
  const router = useRouter();
  const onSubmit = (
    data: RegisterDto & { inviteCode: string; confirmPassword: string },
  ) => {
    if (data.birthdate) {
      const [d, m, y] = data.birthdate.split("/");
      data.birthdate = `${y}-${m}-${d}`;
    } else {
      data.birthdate = undefined;
    }
    const registerPayload = {
      inviteCode: data.inviteCode,
      data: {
        fullName: data.fullName,
        internationalName: data.internationalName,
        gender: data.gender,
        birthdate: data.birthdate,
        phoneNumber: data.phoneNumber,
        email: data.email,
        password: data.password,
      },
    };

    try {
      registerMutation.mutate(registerPayload, {
        onSuccess: () => {
          router.push("/dashboard");
        },
      });
    } catch (error) {
      toast.error("Đăng ký thất bại");
    }
  };

  return (
    <Card className="z-10 flex min-h-[50vh] flex-col gap-4 bg-white p-3">
      {/* Tabs controlled by state */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-1/2-screen grid grid-cols-2 gap-4"
          style={{ minHeight: "50vh" }}
        >
          <div className="flex flex-1 flex-col justify-center">
            <FormField
              control={form.control}
              name="inviteCode"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center">
                  <FormLabel>Mã mời tham gia CLB Newton</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>
                    Nhập <u>mã mời</u> nhận từ email, hoặc người phỏng vấn.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {JSON.stringify(form.formState.isValid)}
            {JSON.stringify(form.formState.isSubmitted)}
          </div>
          <div className="w-full">
            <Tabs value={tab} onValueChange={setTab}>
              <div className="mb-4 flex justify-evenly">
                <span
                  className={cn(
                    "mr-2 flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold",
                    tab === "1"
                      ? "bg-yellow-300 text-black"
                      : "bg-black text-white",
                  )} // style={{ minWidth: "1.5rem", minHeight: "1.5rem" }}
                  aria-label="Step 1"
                >
                  1
                </span>
                <span
                  className={cn(
                    "mr-2 flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold",
                    tab === "2"
                      ? "bg-yellow-300 text-black"
                      : "bg-black text-white",
                  )}
                  aria-label="Step 1"
                >
                  2
                </span>
                <span
                  className={cn(
                    "mr-2 flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold",
                    tab === "3"
                      ? "bg-yellow-300 text-black"
                      : "bg-black text-white",
                  )} // style={{ minWidth: "1.5rem", minHeight: "1.5rem" }}
                  aria-label="Step 1"
                >
                  3
                </span>
              </div>
              {!form.formState.isValid && form.formState.isSubmitted && (
                <span className="text-sm text-red-600">
                  Thông tin chưa đúng. Vui lòng kiểm tra lại.
                </span>
              )}
              <TabsContent value="1">
                <div className="flex flex-col gap-4 rounded-md border p-4">
                  <FormField
                    name="fullName"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          className="mb-1 block text-sm font-medium"
                          htmlFor="fullName"
                        >
                          Họ và tên <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="fullName"
                            type="text"
                            className="input input-bordered w-full"
                            placeholder="Nguyễn Văn A"
                            autoComplete="name"
                            required
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="internationalName"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          className="mb-1 block text-sm font-medium"
                          htmlFor="internationalName"
                        >
                          Tên quốc tế
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="internationalName"
                            type="text"
                            className="input input-bordered w-full"
                            placeholder="International Name"
                            autoComplete="off"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="gender"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="mb-2 block text-sm font-medium">
                          Giới tính <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <div className="flex gap-5">
                            <label className="flex items-center gap-2">
                              <input
                                type="radio"
                                value="male"
                                checked={field.value === "male"}
                                onChange={() => field.onChange("male")}
                                className="radio"
                                required
                              />
                              Nam
                            </label>
                            <label className="flex items-center gap-2">
                              <input
                                type="radio"
                                value="female"
                                checked={field.value === "female"}
                                onChange={() => field.onChange("female")}
                                className="radio"
                              />
                              Nữ
                            </label>
                            <label className="flex items-center gap-2">
                              <input
                                type="radio"
                                value="other"
                                checked={field.value === "other"}
                                onChange={() => field.onChange("other")}
                                className="radio"
                              />
                              Khác
                            </label>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              <TabsContent value="2">
                <div className="space-y-6 rounded-md border p-4">
                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Email<span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your@email.com"
                            {...field}
                            autoComplete="email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Birthdate */}
                  <FormField
                    control={form.control}
                    name="birthdate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Ngày sinh<span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="string"
                            value={
                              field.value
                              // ? typeof field.value === "string"
                              //   ? field.value
                              //   : field.value.toISOString().split("T")[0]
                              // : ""
                            }
                            onChange={(e) => {
                              let v = e.target.value.replace(/\D/g, "");
                              if (v.length > 2)
                                v = v.slice(0, 2) + "/" + v.slice(2);
                              if (v.length > 5)
                                v = v.slice(0, 5) + "/" + v.slice(5, 9);
                              field.onChange(v);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              <TabsContent value="3">
                <div className="flex flex-col gap-4 rounded-md border p-4">
                  {/* Phone Number */}
                  <FormField
                    name="phoneNumber"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          className="mb-1 block text-sm font-medium"
                          htmlFor="phoneNumber"
                        >
                          Số điện thoại <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="phoneNumber"
                            type="tel"
                            className="input input-bordered w-full"
                            placeholder="0987654321"
                            autoComplete="tel"
                            required
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Password */}
                  <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          className="mb-1 block text-sm font-medium"
                          htmlFor="password"
                        >
                          Mật khẩu <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="password"
                            type="password"
                            className="input input-bordered w-full"
                            placeholder="••••••••"
                            autoComplete="new-password"
                            required
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Confirm Password */}
                  <FormField
                    name="confirmPassword"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          className="mb-1 block text-sm font-medium"
                          htmlFor="confirmPassword"
                        >
                          Xác nhận mật khẩu{" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            id="confirmPassword"
                            type="password"
                            className="input input-bordered w-full"
                            placeholder="••••••••"
                            autoComplete="new-password"
                            required
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
            </Tabs>

            {/* External buttons to switch tabs */}
            <div className="mt-2 flex justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  // Go to previous tab if possible
                  setTab(String(Number(tab) - 1));
                }}
                disabled={tab === "1"}
              >
                <ArrowLeft />
                Quay lại
              </Button>
              {tab !== "3" ? (
                <Button
                  variant="default"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setTab(String(Number(tab) + 1));
                  }}
                >
                  Tiếp theo
                  <ArrowRight />
                </Button>
              ) : (
                <Button variant="default" type="submit">
                  <UserPlus />
                  Đăng ký
                </Button>
              )}
            </div>
          </div>
        </form>
      </Form>
    </Card>
  );
}

// export function RegisterPage() {
//   return (
//     <div className="z-10 flex min-h-svh w-full items-center justify-center p-6 md:p-10">
//       <div className="w-full max-w-sm">
//         <div className="flex flex-col gap-6">
//           <Card className="bg-white/50 backdrop-blur-sm">
//             <CardHeader>
//               <CardTitle>Bạn chưa có tài khoản?</CardTitle>
//               <CardDescription>
//                 Nhập thông tin của bạn để đăng ký.
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <SignupForm signupAction={signup} />
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }
