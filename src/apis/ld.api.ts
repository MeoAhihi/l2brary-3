import { Session } from "@/types/ld.types";
import sessions from "@/constants/sessions.json";
import { StampType, StudentStamp } from "@/types/ld.types";
import { Star, Trophy, Gift, Medal, Award } from "lucide-react";

export async function getSessions(courseId: string): Promise<Session[]> {
  return sessions
    .map((s) => ({
      ...s,
      startTime: new Date(s.startTime),
      endTime: s.endTime ? new Date(s.endTime) : undefined,
    }))
    .sort(
      (a, b) => -a.startTime.getTime() + b.startTime.getTime()
    ) as Session[];
}

export async function getStampTypes(sessionId: string): Promise<StampType[]> {
  return [
    {
      id: "participation",
      name: "Participation",
      icon: Star,
      color: "text-yellow-600",
    },
    {
      id: "excellence",
      name: "Excellence",
      icon: Trophy,
      color: "text-blue-600",
    },
    {
      id: "helpfulness",
      name: "Helpfulness",
      icon: Gift,
      color: "text-green-600",
    },
    {
      id: "leadership",
      name: "Leadership",
      icon: Medal,
      color: "text-purple-600",
    },
    {
      id: "creativity",
      name: "Creativity",
      icon: Award,
      color: "text-pink-600",
    },
  ];
}

// Mock data for students

export async function getStudentStamps(
  sessionId: string
): Promise<StudentStamp[]> {
  return [
    {
      id: 1,
      name: "Nguyễn Văn A",
      internationalName: "John Doe",
      avatar: "/avatars/01.png",
      stamps: 3,
      stampTypeId: "participation",
    },
    {
      id: 2,
      name: "Trần Thị B",
      internationalName: "Jane Smith",
      avatar: "/avatars/02.png",
      stamps: 2,
      stampTypeId: "excellence",
    },
    {
      id: 3,
      name: "Lê Minh C",
      internationalName: "Mike Johnson",
      avatar: "/avatars/03.png",
      stamps: 0,
      stampTypeId: "helpfulness",
    },
    {
      id: 4,
      name: "Phạm Thu D",
      internationalName: "Sarah Wilson",
      avatar: "/avatars/04.png",
      stamps: 1,
      stampTypeId: "leadership",
    },
    {
      id: 5,
      name: "Vũ Quốc E",
      internationalName: "David Brown",
      avatar: "/avatars/05.png",
      stamps: 0,
      stampTypeId: "creativity",
    },
  ];
}
