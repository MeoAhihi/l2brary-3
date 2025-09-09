import { z } from "zod";
import { EnrollmentStatus } from "./ld.types";

export const EnrollmentSchema = z.object({
  id: z.number(),
  student: z.object({
    name: z.string(),
    email: z.string(),
    avatar: z.string(),
  }),
  status: z.nativeEnum(EnrollmentStatus),
  enrolledDate: z.string(),
  lastActivity: z.string(),
  progress: z.number(),
  grade: z.string(),
  attendance: z.number(),
  assignments: z.number(),
  completed: z.number(),
});

export type EnrollmentSchemaType = z.infer<typeof EnrollmentSchema>;

export const CourseSchema = z.object({
  id: z.string(),
  thumbnail: z.string(),
  title: z.string(),
  classGroup: z.string(),
  recurrentRule: z.string(),
  time: z.string(),
});

export type CourseSchemaType = z.infer<typeof CourseSchema>;
