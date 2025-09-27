import { CourseState, CourseAction } from "./types";

export const courseReducer = (
  state: CourseState,
  action: CourseAction,
): CourseState => {
  switch (action.type) {
    case "FETCH_COURSES_REQUEST":
      return {
        ...state,
        loading: true,
        error: undefined,
      };
    case "FETCH_COURSES_SUCCESS":
      return {
        ...state,
        loading: false,
        courses: action.payload,
      };
    case "FETCH_COURSES_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "SELECT_COURSE":
      return {
        ...state,
        selectedCourse: action.payload,
      };
    default:
      return state;
  }
};
