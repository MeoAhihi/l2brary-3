import { ReactNode } from "react";

import { CoursesResponse } from "@/types/courses/response";

// The state for the course context
export interface CourseState {
  courses: CoursesResponse[];
  selectedCourse?: CoursesResponse;
  loading: boolean;
  error?: string;
}

// The actions that can be dispatched
export type CourseAction =
  | { type: "FETCH_COURSES_REQUEST" }
  | { type: "FETCH_COURSES_SUCCESS"; payload: CoursesResponse[] }
  | { type: "FETCH_COURSES_FAILURE"; payload: string }
  | { type: "SELECT_COURSE"; payload?: CoursesResponse };

// The shape of the context
export interface CourseContextType extends CourseState {
  dispatch: React.Dispatch<CourseAction>;
}

export interface CourseProviderProps {
  children: ReactNode;
}
