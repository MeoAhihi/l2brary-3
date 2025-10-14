"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateSessionMutation } from "@/hooks";
import type { CreateSessionDto } from "@/types/session/create-session.api.dto";

export default function NewSessionPage() {
  const router = useRouter();

  const params = useParams();
  const courseId =
    typeof params["course-id"] === "string"
      ? params["course-id"]
      : Array.isArray(params["course-id"])
        ? params["course-id"][0]
        : "";

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateSessionDto>({
    defaultValues: {
      title: "",
      description: "",
      startTime: undefined,
      endTime: undefined,
      presenterName: "",
      locationType: "",
      roomInfo: "",
      address: "",
      maxParticipant: undefined,
      lateThreshold: undefined,
      autoCheckIn: false,
      allowLateJoin: false,
      enableGame: false,
      autoScoring: false,
      maxGamePerSession: undefined,
      gameTimeout: undefined,
      emailNotification: false,
      smsNotification: false,
      reminderNotification: false,
      thumbnail: "",
    },
  });

  const createSession = useCreateSessionMutation({
    onSuccess: () => {
      toast.success("Tạo Buổi học thành công");
      router.push(`/admin/ld/courses/${courseId}}/manage/sessions`);
    },
  });

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-2xl py-8">
      <h1 className="mb-4 text-2xl font-bold">Tạo buổi học mới</h1>
      <form
        className="space-y-4"
        onSubmit={handleSubmit((data) => {
          createSession.mutate({ courseId, sessionData: data });
        })}
      >
        <div className="space-y-2">
          <Label htmlFor="title">Tên buổi học *</Label>
          <Input
            id="title"
            {...register("title", { required: true })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Mô tả</Label>
          <Textarea id="description" {...register("description")} />
        </div>
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex-1 space-y-2">
            <Label htmlFor="startTime">Bắt đầu</Label>
            <Input
              id="startTime"
              type="datetime-local"
              {...register("startTime", { required: true })}
              required
            />
          </div>
          <div className="flex-1 space-y-2">
            <Label htmlFor="endTime">Kết thúc</Label>
            <Input
              id="endTime"
              type="datetime-local"
              {...register("endTime", { required: true })}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="presenterName">Tên diễn giả/GV</Label>
          <Input id="presenterName" {...register("presenterName")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="locationType">Hình thức</Label>
          <Input
            id="locationType"
            placeholder="online/offline"
            {...register("locationType")}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="roomInfo">Phòng học</Label>
          <Input id="roomInfo" {...register("roomInfo")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Địa chỉ</Label>
          <Input id="address" {...register("address")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="thumbnail">Ảnh đại diện (URL)</Label>
          <Input id="thumbnail" {...register("thumbnail")} />
        </div>
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex-1">
            <Label htmlFor="maxParticipant">Số người tối đa</Label>
            <Input
              id="maxParticipant"
              type="number"
              min={0}
              {...register("maxParticipant", { valueAsNumber: true })}
            />
          </div>
          <div className="flex-1">
            <Label htmlFor="lateThreshold">Số phút tới trễ</Label>
            <Input
              id="lateThreshold"
              type="number"
              min={0}
              {...register("lateThreshold", { valueAsNumber: true })}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Input
              type="checkbox"
              id="autoCheckIn"
              {...register("autoCheckIn")}
            />
            <Label htmlFor="autoCheckIn">Tự động điểm danh</Label>
          </div>
          <div className="flex items-center gap-2">
            <Input
              type="checkbox"
              id="allowLateJoin"
              {...register("allowLateJoin")}
            />
            <Label htmlFor="allowLateJoin">Cho phép vào muộn</Label>
          </div>
          <div className="flex items-center gap-2">
            <Input
              type="checkbox"
              id="enableGame"
              {...register("enableGame")}
            />
            <Label htmlFor="enableGame">Bật trò chơi</Label>
          </div>
          <div className="flex items-center gap-2">
            <Input
              type="checkbox"
              id="autoScoring"
              {...register("autoScoring")}
            />
            <Label htmlFor="autoScoring">Tự động chấm điểm</Label>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex-1">
            <Label htmlFor="maxGamePerSession">Trò chơi/buổi</Label>
            <Input
              id="maxGamePerSession"
              type="number"
              min={0}
              {...register("maxGamePerSession", { valueAsNumber: true })}
            />
          </div>
          <div className="flex-1">
            <Label htmlFor="gameTimeout">Thời gian game (phút)</Label>
            <Input
              id="gameTimeout"
              type="number"
              min={0}
              {...register("gameTimeout", { valueAsNumber: true })}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Input
              type="checkbox"
              id="emailNotification"
              {...register("emailNotification")}
            />
            <Label htmlFor="emailNotification">Gửi thông báo Email</Label>
          </div>
          <div className="flex items-center gap-2">
            <Input
              type="checkbox"
              id="smsNotification"
              {...register("smsNotification")}
            />
            <Label htmlFor="smsNotification">Gửi SMS</Label>
          </div>
          <div className="flex items-center gap-2">
            <Input
              type="checkbox"
              id="reminderNotification"
              {...register("reminderNotification")}
            />
            <Label htmlFor="reminderNotification">Thông báo nhắc nhở</Label>
          </div>
        </div>

        {errorMsg && (
          <div className="text-destructive bg-destructive/10 rounded p-2">
            {errorMsg}
          </div>
        )}
        <div className="flex justify-end">
          <Button type="submit" disabled={createSession.isPending}>
            {createSession.isPending
              ? "Đang tạo buổi học mới ..."
              : "Tạo buổi học"}
          </Button>
        </div>
      </form>
    </div>
  );
}
