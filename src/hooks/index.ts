// Global hooks barrel exports
export * from "./courses";
export * from "./activity-log";

// Re-export specific hooks for convenience
export { useCourseFilters } from "./courses/useCourseFilters";
export { useCoursePagination } from "./courses/useCoursePagination";
export { useCoursesQuery } from "./courses/useCoursesQuery";
export { useCoursesTable } from "./courses/useCoursesTable";
