// Global hooks barrel exports
export * from "./activity-log";
export * from "./courses";
export * from "./sessions";

// Re-export specific hooks for convenience
export { useCourseFilters } from "./courses/useCourseFilters";
export { useCoursePagination } from "./courses/useCoursePagination";
export { useCoursesQuery } from "./courses/useCoursesQuery";
export { useCoursesTable } from "./courses/useCoursesTable";

// Session hooks
export { useCreateSessionMutation } from "./sessions/useCreateSessionMutation";
export { useDeleteSessionMutation } from "./sessions/useDeleteSessionMutation";
export { useMarkAttendanceMutation } from "./sessions/useMarkAttendanceMutation";
export { useSessionAttendanceQuery } from "./sessions/useSessionAttendanceQuery";
export { useSessionByIdQuery } from "./sessions/useSessionByIdQuery";
export { useSessionsQuery } from "./sessions/useSessionsQuery";
export { useUpdateSessionMutation } from "./sessions/useUpdateSessionMutation";
