import { ReferenceCourseDto } from "@/types/courses/reference-course.dto";

export interface ScoreColumnItem {
  id: number;
  name: string;
  coefficient: number;
  isLocked: boolean;
}

export interface ScoreColumnResponseDto {
  id: number;
  name: string;
  coefficient: number;
  isLocked: boolean;
  course: ReferenceCourseDto;
}
