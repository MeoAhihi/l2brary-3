import { DefaultOptions, QueryCache, QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { IS_DEVELOPMENT } from "@/constants/common";
import { queryKeys } from "@/constants/query-keys";

// Default configuration for QueryClient
const defaultOptions: DefaultOptions = {
  queries: {
    // staleTime: time until data is considered fresh (5 minutes)
    staleTime: 5 * 60 * 1000, // 300000ms

    // gcTime: time cache is kept in memory (10 minutes) - replaces cacheTime
    gcTime: 10 * 60 * 1000, // 600000ms

    // Retry logic: retry 3 times with exponential backoff
    retry: (failureCount, error) => {
      // Do not retry for 4xx errors (client errors)
      // Check for both Error instances and plain objects with status property
      const hasStatus =
        (error instanceof Error && "status" in error) ||
        (error && typeof error === "object" && "status" in error);

      if (hasStatus) {
        const errorWithStatus = error as { status: unknown };
        const status = errorWithStatus.status;
        if (typeof status === "number" && status >= 400 && status < 500) {
          console.log(`🚫 No retry for ${status} error:`, error);
          return false;
        }
      }

      // Retry maximum 3 times for other errors
      console.log(`🔄 Retry attempt ${failureCount + 1}/3 for error:`, error);
      return failureCount < 3;
    },

    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff, max 30s

    // Refetch settings
    refetchOnWindowFocus: "always", // Refetch when window focus
    refetchOnReconnect: "always", // Refetch when reconnect
    refetchOnMount: true, // Refetch when component mount

    // Network mode
    networkMode: "online", // Only fetch when online
  },

  mutations: {
    // Retry mutations 1 time
    retry: 1,

    // Network mode for mutations
    networkMode: "online",

    // Error handling for mutations
    onError: (error) => {
      console.error("Mutation error:", error);
      toast.error("Đã xảy ra lỗi khi thực hiện thao tác", {
        description: Array.isArray(error)
          ? error[0]?.message
          : error?.message || "Vui lòng thử lại sau",
      });
    },
  },
};

// QueryCache to handle global errors
const queryCache = new QueryCache({
  onError: (error, query) => {
    // Log error for debugging
    console.error("Query error:", error, "Query:", query.queryKey);

    // Display toast error for user (optional)
    if (error && error?.message) {
      toast.error(error.message);
    }
  },
});

// Create QueryClient instance with optimal configuration
export const queryClient = new QueryClient({
  defaultOptions,
  queryCache,
});

// Devtools configuration for development
if (IS_DEVELOPMENT) {
  // Enable React Query DevTools
  if (typeof window !== "undefined") {
    // Import devtools dynamically to avoid SSR issues
    import("@tanstack/react-query-devtools")
      .then(() => {
        // Devtools will be mounted automatically when component is used
      })
      .catch(() => {
        // Ignore if devtools package is not available
      });
  }
}

// Helper function to invalidate related queries
export const invalidateQueries = {
  auth: () => queryClient.invalidateQueries({ queryKey: ["auth"] }),
  session: () =>
    queryClient.invalidateQueries({ queryKey: queryKeys.auth.session }),
  iam: () => queryClient.invalidateQueries({ queryKey: ["iam"] }),
  ld: () => queryClient.invalidateQueries({ queryKey: ["ld"] }),
  members: () => queryClient.invalidateQueries({ queryKey: queryKeys.members }),
  posts: () => queryClient.invalidateQueries({ queryKey: queryKeys.posts }),
  all: () => queryClient.invalidateQueries(),
  courseDetail: () =>
    queryClient.invalidateQueries({
      queryKey: [queryKeys.ld.coursesDetail],
    }),
  enrollments: () =>
    queryClient.invalidateQueries({
      queryKey: [queryKeys.ld.enrollments],
    }),
  myEnrollments: () =>
    queryClient.invalidateQueries({
      queryKey: [queryKeys.ld.myEnrollments],
    }),

  // Score-related invalidations
  scoreColumns: () =>
    queryClient.invalidateQueries({ queryKey: queryKeys.ld.scoreColumns }),
  scoreTable: (courseId?: string) =>
    queryClient.invalidateQueries({
      queryKey: courseId
        ? queryKeys.ld.scoreTable(courseId)
        : ["ld", "score-table"],
    }),
  scoreColumnDetails: (columnId?: string) =>
    queryClient.invalidateQueries({
      queryKey: columnId
        ? queryKeys.ld.scoreColumnDetails(columnId)
        : ["ld", "score-column-details"],
    }),
};
