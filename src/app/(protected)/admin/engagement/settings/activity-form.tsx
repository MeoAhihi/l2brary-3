"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown, Plus, Save, X } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { LabelValue } from "@/types/common";

import { ActivityType } from "./columns";

const formSchema = z.object({
  "activity-name": z.string().min(1),
  "engagement-score": z.any(),
  category: z.string(),
});

type ActivityFormProps = {
  categories?: LabelValue[];
  selectedActivity?: ActivityType | null;
  onFormSubmit?: (values?: z.infer<typeof formSchema>) => void;
};

export default function ActivityForm({
  categories,
  selectedActivity,
  onFormSubmit,
}: ActivityFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      "activity-name": "",
      "engagement-score": 1,
      category: "",
    },
  });

  // Populate form when an activity is selected
  useEffect(() => {
    if (selectedActivity) {
      form.setValue("activity-name", selectedActivity.name);
      form.setValue("engagement-score", selectedActivity.engagementScore);
      form.setValue("category", selectedActivity.category);
      // Note: We don't have category in ActivityType, so we'll leave it empty
      // You might want to add category to ActivityType if needed
    } else {
      form.reset();
    }
  }, [selectedActivity, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      toast.success(
        selectedActivity
          ? "Cập nhật hoạt động thành công!"
          : "Thêm hoạt động mới thành công!",
      );
      onFormSubmit?.(values);
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 py-3">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4">
            <FormField
              control={form.control}
              name="activity-name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên hoạt động</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Chia sẻ Nghiên cứu"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Tên gọi của hoạt động</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-4">
            <FormField
              control={form.control}
              name="engagement-score"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Điểm tương tác</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    Mức độ tương tác của hoạt động này.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-4">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Phân loại</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value
                            ? categories?.find(
                                (language) => language.value === field.value,
                              )?.label
                            : "Select language"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search language..." />
                        <CommandList>
                          <CommandEmpty>Chưa có phân loại nào</CommandEmpty>
                          <CommandGroup>
                            {categories?.map(({ label, value }) => (
                              <CommandItem
                                value={label}
                                key={value}
                                onSelect={() => {
                                  form.setValue("category", value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    value === field.value
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                                {label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>Phân nhóm của hoạt động</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex flex-row justify-end gap-3">
          {selectedActivity ? (
            <>
              <Button
                variant="outline"
                onClick={() => {
                  // Set selectedActivity to null by triggering onFormSubmit with no values
                  onFormSubmit?.();
                }}
              >
                <X /> hủy bỏ
              </Button>
              <Button type="submit">
                <Save /> Lưu thay đổi
              </Button>
            </>
          ) : (
            <>
              <Button type="submit">
                <Plus /> Tạo hoạt động mới
              </Button>
            </>
          )}
        </div>
      </form>
    </Form>
  );
}
