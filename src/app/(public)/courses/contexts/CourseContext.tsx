"use client";

import { createContext, useContext, useReducer } from "react";

import { courseReducer } from "./reducer";
import { CourseContextType, CourseProviderProps, CourseState } from "./types";

const initialState: CourseState = {
  courses: [],
  selectedCourse: undefined,
  loading: false,
  error: undefined,
};

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider = ({ children }: CourseProviderProps) => {
  const [state, dispatch] = useReducer(courseReducer, initialState);

  return (
    <CourseContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = (): CourseContextType => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error("useCourse must be used within a CourseProvider");
  }
  return context;
};
