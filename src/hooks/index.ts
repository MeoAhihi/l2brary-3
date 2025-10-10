// Global hooks barrel exports
export * from "./courses";
export * from "./activity-log";
export * from "./sessions";

// Re-export specific hooks for convenience
export { useCourseFilters } from "./courses/useCourseFilters";
export { useCoursePagination } from "./courses/useCoursePagination";
export { useCoursesQuery } from "./courses/useCoursesQuery";
export { useCoursesTable } from "./courses/useCoursesTable";

// Session hooks
export { useSessionsQuery } from "./sessions/useSessionsQuery";
export { useSessionByIdQuery } from "./sessions/useSessionByIdQuery";
export { useSessionAttendanceQuery } from "./sessions/useSessionAttendanceQuery";
export { useCreateSessionMutation } from "./sessions/useCreateSessionMutation";
export { useUpdateSessionMutation } from "./sessions/useUpdateSessionMutation";
export { useDeleteSessionMutation } from "./sessions/useDeleteSessionMutation";
export { useMarkAttendanceMutation } from "./sessions/useMarkAttendanceMutation";
