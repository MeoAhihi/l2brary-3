"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Message = {
  id: number;
  sender: "user" | "bot";
  text: string;
};

export default function AcivityLogPage() {
  // Zod + React Hook Form setup

  const formSchema = z.object({
    message: z.string().min(1, "Message is required"),
    datetime: z.coerce.date({
      required_error: "Date and time is required",
      invalid_type_error: "Invalid date and time",
    }),
    activity: z.string().min(1, "Activity is required"),
    member: z.string().min(1, "Member name is required"),
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
      datetime: new Date(),
      activity: "",
      member: "",
    },
  });

  const [messages, setMessages] = useState<ActivityLogProps[]>([
    {
      datetime: new Date("2024-06-01T09:00:00"),
      memberName: "Alice",
      sender: "system",
      actionName: "đăng nhập",
    },
    {
      datetime: new Date("2024-06-01T09:05:00"),
      memberName: "Bob",
      sender: "user",
      actionName: "tải lên một tệp",
    },
    {
      datetime: new Date("2024-06-01T09:10:00"),
      memberName: "Carol",
      sender: "system",
      actionName: "đổi mật khẩu",
    },
    {
      datetime: new Date("2024-06-01T09:15:00"),
      memberName: "Dave",
      sender: "user",
      actionName: "tham gia nhóm",
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend(data: any) {
    // This function is now used as a form submit handler for react-hook-form
    // The 'data' argument contains the form values
    const userMessage: ActivityLogProps = {
      datetime: data.datetime,
      memberName: data.member,
      sender: "user",
      actionName: data.activity,
    };
    setMessages((msgs) => [...msgs, userMessage]);

    // Simulate bot response
    // Instead of pushing a bot message with a different shape, push a valid ActivityLogProps
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        {
          datetime: new Date(),
          memberName: "Bot",
          sender: "system",
          actionName: "This is a demo bot response.",
        },
      ]);
    }, 800);

    // Optionally, reset the form field for message
    form.resetField("message");
  }

  return (
    <div className="container mx-auto flex min-h-[80vh] flex-col items-center px-4 py-8">
      <div className="bg-card flex w-full max-w-2xl flex-1 flex-col rounded-xl border shadow-sm">
        <div className="border-b px-6 py-4">
          <h1 className="text-2xl font-bold">Lịch sử Hoạt động</h1>
          <p className="text-muted-foreground text-sm">
            Lịch sử hoạt động của các thành viên theo trình tự thời gian.
          </p>
        </div>
        <div
          className="flex-1 space-y-4 overflow-y-auto px-6 py-4"
          style={{ minHeight: 300 }}
        >
          <div className="flex flex-col gap-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === "system" ? "justify-start" : "justify-end"}`}
              >
                <div className="w-fit max-w-[70%]">
                  <AcivityLogChat
                    datetime={msg.datetime}
                    memberName={msg.memberName}
                    sender={msg.sender}
                    actionName={msg.actionName}
                  />
                </div>
              </div>
            ))}
          </div>
          <div ref={messagesEndRef} />
        </div>
        {/* Shadcn form with 3 fields: date time (default current), activity (select), members (select) */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSend)}
            className="flex flex-col gap-4 border-t px-6 py-4"
          >
            <div className="flex flex-col gap-4 md:flex-row">
              {/* Date Time Field */}
              <FormField
                control={form.control}
                name="datetime"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Date &amp; Time</FormLabel>
                    <FormControl>
                      <Input
                        type="datetime-local"
                        {...field}
                        value={
                          typeof field.value === "string"
                            ? field.value
                            : field.value instanceof Date
                              ? field.value.toISOString().slice(0, 16)
                              : new Date().toISOString().slice(0, 16)
                        }
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Activity Select Field */}
              <FormField
                control={form.control}
                name="activity"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Activity</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select activity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="running">Running</SelectItem>
                          <SelectItem value="cycling">Cycling</SelectItem>
                          <SelectItem value="swimming">Swimming</SelectItem>
                          <SelectItem value="yoga">Yoga</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Members Select Field */}
              <FormField
                control={form.control}
                name="member"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Members</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select member" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user-id-001">Alice</SelectItem>
                          <SelectItem value="user-id-002">Bob</SelectItem>
                          <SelectItem value="user-id-003">Carol</SelectItem>
                          <SelectItem value="user-id-004">Dave</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <button
              type="submit"
              className="bg-primary text-primary-foreground hover:bg-primary/90 self-end rounded-md px-4 py-2 font-medium transition"
            >
              Log Activity
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
}

type ActivityLogProps = {
  datetime: Date;
  memberName: string;
  sender: "user" | "system" | string;
  actionName: string;
};

export function AcivityLogChat({
  datetime,
  memberName,
  actionName,
  sender,
}: ActivityLogProps) {
  return (
    <div className="flex justify-center">
      <div className="flex w-full max-w-xs flex-col">
        <div className="text-muted-foreground mb-1 text-xs">
          {sender !== "user" && sender}
        </div>
        <div className="bg-muted text-foreground w-full rounded-lg px-4 py-2 text-center">
          {`${memberName} đã ${actionName}`}
        </div>
        <div className="text-muted-foreground mt-1 self-end text-xs">
          {datetime.toLocaleString()}
        </div>
      </div>
    </div>
  );
}
