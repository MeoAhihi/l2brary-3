import { ReferenceCourseDto } from "@/types/courses/reference-course.dto";

export type ScoreColumnItem = {
  id: number;
  name: string;
  coefficient: number;
  isLocked: boolean;
};

export type ScoreColumnResponseDto = {
  id: number;
  name: string;
  coefficient: number;
  isLocked: boolean;
  course: ReferenceCourseDto;
};
