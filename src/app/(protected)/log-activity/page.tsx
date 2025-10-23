"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { getAllUsers } from "@/apis/user.api";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGamificationDataQuery,
  useLogGamificationActivityMutation,
} from "@/hooks";
import { useActivitiesQuery } from "@/hooks/activities";

import ActivityLogChat from "./components/ActivityLogChat";

export default function AcivityLogPage() {
  const { data, isLoading } = useGamificationDataQuery({ page: 1, limit: 20 });
  const { data: users, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["user", "all"],
    queryFn: () => getAllUsers({ limit: 100 }), // very big number to get all
    select: (res) =>
      res.data.items.sort(
        (a: { fullName: string }, b: { fullName: string }) => {
          const getLastName = (fullName: string) => {
            const parts = fullName.trim().split(/\s+/);
            return parts.length > 0 ? parts[parts.length - 1] : "";
          };
          return getLastName(a.fullName).localeCompare(getLastName(b.fullName));
        },
      ),
  });

  const { data: activities, isLoading: isLoadingActivities } =
    useActivitiesQuery();
  // Zod + React Hook Form setup

  const logActivity = useLogGamificationActivityMutation();

  const formSchema = z.object({
    activityId: z.string(),
    userId: z.string().min(1, "Member is required"),
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      activityId: "",
      userId: "",
    },
  });

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  function handleSend({
    userId,
    activityId,
  }: {
    userId: string;
    activityId: string;
  }) {
    // This function is now used as a form submit handler for react-hook-form
    // The 'data' argument contains the form values
    logActivity.mutate({ userId, activityId: Number(activityId) });
    form.reset();
  }

  if (isLoading || isLoadingUsers || isLoadingActivities) {
    return <div>Loading...</div>;
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
          className="flex-1 space-y-4 overflow-y-scroll px-6 py-4"
          style={{ maxHeight: "50vh" }}
        >
          <div className="flex flex-col gap-4">
            {data?.items.map((log, idx) => (
              <div
                key={idx}
                className={`flex ${log.loggedBy === "system" ? "justify-start" : "justify-end"}`}
              >
                <div className="w-fit max-w-[70%]">
                  <ActivityLogChat
                    datetime={log.createdAt}
                    memberName={log.user.fullName}
                    sender={log.loggedBy}
                    actionName={log.activity.name}
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
              {/* Activity Select Field */}
              <FormField
                control={form.control}
                name="activityId"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Hoạt động</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value.toString()}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Chọn hoạt động" />
                        </SelectTrigger>
                        <SelectContent>
                          {activities?.map((a) => (
                            <SelectItem key={a.id} value={a.id.toString()}>
                              [{a.category}] {a.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Members Select Field */}
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Thành viên</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Chọn thành viên" />
                        </SelectTrigger>
                        <SelectContent>
                          {users?.map((user) => (
                            <SelectItem key={user.id} value={user.id}>
                              [{user.fullName.split(" ").slice(-1)[0]}]{" "}
                              {user.fullName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
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
