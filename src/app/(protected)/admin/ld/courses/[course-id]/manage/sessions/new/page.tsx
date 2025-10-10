"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { createSession } from "@/apis/session.api";
import type { CreateSessionDto } from "@/types/session/create-session.api.dto";
import { useCreateSessionMutation } from "@/hooks";
import { toast } from "sonner";

export default function NewSessionPage() {
  const router = useRouter();

  const params = useParams();
  const courseId =
    typeof params["course-id"] === "string"
      ? params["course-id"]
      : Array.isArray(params["course-id"])
        ? params["course-id"][0]
        : "";
  const createSession = useCreateSessionMutation({
    onSuccess: () => {
      toast.success("Tạo Buổi học thành công");
      router.push(`/admin/ld/courses/${courseId}}/manage/sessions`);
    },
  });

  // Form state
  const [form, setForm] = useState<CreateSessionDto>({
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
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const {
      name,
      value,
      type,
      // checked
    } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : name.endsWith("Time") && value
            ? new Date(value)
            : name.startsWith("max") ||
                name.endsWith("Threshold") ||
                name.endsWith("Timeout")
              ? value === ""
                ? undefined
                : Number(value)
              : value,
    }));
  };

  return (
    <div className="mx-auto max-w-2xl py-8">
      <h1 className="mb-4 text-2xl font-bold">Tạo buổi học mới</h1>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Tên buổi học *</Label>
          <Input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Mô tả</Label>
          <Textarea
            id="description"
            name="description"
            value={form.description || ""}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex-1 space-y-2">
            <Label htmlFor="startTime">Bắt đầu</Label>
            <Input
              id="startTime"
              name="startTime"
              type="datetime-local"
              value={
                form.startTime
                  ? new Date(form.startTime).toISOString().slice(0, 16)
                  : ""
              }
              onChange={handleChange}
            />
          </div>
          <div className="flex-1 space-y-2">
            <Label htmlFor="endTime">Kết thúc</Label>
            <Input
              id="endTime"
              name="endTime"
              type="datetime-local"
              value={
                form.endTime
                  ? new Date(form.endTime).toISOString().slice(0, 16)
                  : ""
              }
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="presenterName">Tên diễn giả/GV</Label>
          <Input
            id="presenterName"
            name="presenterName"
            value={form.presenterName || ""}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="locationType">Hình thức</Label>
          <Input
            id="locationType"
            name="locationType"
            value={form.locationType || ""}
            placeholder="online/offline"
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="roomInfo">Phòng học</Label>
          <Input
            id="roomInfo"
            name="roomInfo"
            value={form.roomInfo || ""}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Địa chỉ</Label>
          <Input
            id="address"
            name="address"
            value={form.address || ""}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="thumbnail">Ảnh đại diện (URL)</Label>
          <Input
            id="thumbnail"
            name="thumbnail"
            value={form.thumbnail || ""}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex-1">
            <Label htmlFor="maxParticipant">Số người tối đa</Label>
            <Input
              id="maxParticipant"
              name="maxParticipant"
              type="number"
              min={0}
              value={form.maxParticipant || ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex-1">
            <Label htmlFor="lateThreshold">Số phút tới trễ</Label>
            <Input
              id="lateThreshold"
              name="lateThreshold"
              type="number"
              min={0}
              value={form.lateThreshold || ""}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Input
              type="checkbox"
              id="autoCheckIn"
              name="autoCheckIn"
              checked={form.autoCheckIn ?? false}
              onChange={handleChange}
            />
            <Label htmlFor="autoCheckIn">Tự động điểm danh</Label>
          </div>
          <div className="flex items-center gap-2">
            <Input
              type="checkbox"
              id="allowLateJoin"
              name="allowLateJoin"
              checked={form.allowLateJoin ?? false}
              onChange={handleChange}
            />
            <Label htmlFor="allowLateJoin">Cho phép vào muộn</Label>
          </div>
          <div className="flex items-center gap-2">
            <Input
              type="checkbox"
              id="enableGame"
              name="enableGame"
              checked={form.enableGame ?? false}
              onChange={handleChange}
            />
            <Label htmlFor="enableGame">Bật trò chơi</Label>
          </div>
          <div className="flex items-center gap-2">
            <Input
              type="checkbox"
              id="autoScoring"
              name="autoScoring"
              checked={form.autoScoring ?? false}
              onChange={handleChange}
            />
            <Label htmlFor="autoScoring">Tự động chấm điểm</Label>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex-1">
            <Label htmlFor="maxGamePerSession">Trò chơi/buổi</Label>
            <Input
              id="maxGamePerSession"
              name="maxGamePerSession"
              type="number"
              min={0}
              value={form.maxGamePerSession || ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex-1">
            <Label htmlFor="gameTimeout">Thời gian game (phút)</Label>
            <Input
              id="gameTimeout"
              name="gameTimeout"
              type="number"
              min={0}
              value={form.gameTimeout || ""}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Input
              type="checkbox"
              id="emailNotification"
              name="emailNotification"
              checked={form.emailNotification ?? false}
              onChange={handleChange}
            />
            <Label htmlFor="emailNotification">Gửi thông báo Email</Label>
          </div>
          <div className="flex items-center gap-2">
            <Input
              type="checkbox"
              id="smsNotification"
              name="smsNotification"
              checked={form.smsNotification ?? false}
              onChange={handleChange}
            />
            <Label htmlFor="smsNotification">Gửi SMS</Label>
          </div>
          <div className="flex items-center gap-2">
            <Input
              type="checkbox"
              id="reminderNotification"
              name="reminderNotification"
              checked={form.reminderNotification ?? false}
              onChange={handleChange}
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
          <Button
            type="submit"
            disabled={createSession.isPending}
            onClick={() => {
              createSession.mutate({ courseId, sessionData: form });
            }}
          >
            {createSession.isPending
              ? "Đang tạo buổi học mới ..."
              : "Tạo buổi học"}
          </Button>
        </div>
      </div>
    </div>
  );
}
