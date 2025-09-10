import courses from "@/constants/courses.json";
import enrollments from "@/constants/enrollments.json";
import sessions from "@/constants/sessions.json";
import { EnrollmentSchema } from "@/types/ld.schema";
import {
  Course,
  Enrollment,
  Session,
  StampType,
  StudentStamp,
} from "@/types/ld.types";
import { Award, Gift, Medal, Star, Trophy } from "lucide-react";

export async function getSessions(): Promise<Session[]> {
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

export async function getStampTypes(): Promise<StampType[]> {
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

// Function to get mock data for studentAttendances
export async function getStudentAttendances() {
  return [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      avatar: "/avatars/01.png",
      checkedIn: true,
      checkInTime: "14:05",
      status: "present",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      avatar: "/avatars/02.png",
      checkedIn: true,
      checkInTime: "14:02",
      status: "present",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      avatar: "/avatars/03.png",
      checkedIn: false,
      checkInTime: null,
      status: "absent",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah.wilson@example.com",
      avatar: "/avatars/04.png",
      checkedIn: true,
      checkInTime: "14:08",
      status: "late",
    },
    {
      id: 5,
      name: "David Brown",
      email: "david.brown@example.com",
      avatar: "/avatars/05.png",
      checkedIn: false,
      checkInTime: null,
      status: "absent",
    },
  ];
}

export async function getEnrollment(): Promise<Enrollment[]> {
  // This function returns the mock enrollments data from the JSON file.
  // In a real implementation, this would fetch from a database or API.
  // Use zod to parse and validate the enrollments data
  return enrollments.map((e) => EnrollmentSchema.parse(e));
}

export async function getCourses(): Promise<Course[]> {
  // Use zod to parse and validate the courses data
  return courses as Course[]; //.map((c) => CourseSchema.parse(c));
}
