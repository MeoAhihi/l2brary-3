// Global hooks barrel exports
export * from "./courses";

// Re-export specific hooks for convenience
export { useCourseFilters } from "./courses/useCourseFilters";
export { useCoursePagination } from "./courses/useCoursePagination";
export { useCoursesQuery } from "./courses/useCoursesQuery";
export { useCoursesTable } from "./courses/useCoursesTable";
