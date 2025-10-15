import { ReferenceCourseDto } from "../courses/reference-course.dto";

export type ReferenceSessionDto = {
  id: number;
  thumbnail?: string;
  title: string;
  course: ReferenceCourseDto;
};
