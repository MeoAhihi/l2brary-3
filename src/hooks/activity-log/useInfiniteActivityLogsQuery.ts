import { useInfiniteQuery } from "@tanstack/react-query";

import { getGamificationData } from "@/apis/activity.api";
import { queryKeys } from "@/constants/query-keys";
import type {
  ActivityLogType,
  GetAllActivityLogsQuery,
} from "@/types/activities/gamification";

interface UseInfiniteActivityLogsQueryProps {
  userId: string;
  limit?: number;
}

export function useInfiniteActivityLogsQuery({
  userId,
  limit = 10,
}: UseInfiniteActivityLogsQueryProps) {
  const queryResult = useInfiniteQuery({
    queryKey: [...queryKeys.ld.activityLogs, userId, "infinite"],
    queryFn: ({ pageParam = 1 }) => {
      const query: GetAllActivityLogsQuery = {
        userId,
        page: pageParam as number,
        limit,
      };
      return getGamificationData(query);
    },
    getNextPageParam: (lastPage) => {
      // Check if there are more pages
      if (lastPage.page < lastPage.pageCount) {
        return lastPage.page + 1;
      }
      return undefined; // No more pages
    },
    initialPageParam: 1,
    refetchOnWindowFocus: false,
    enabled: !!userId,
  });

  // Flatten all pages into a single array
  const allActivityLogs =
    queryResult.data?.pages.flatMap((page) => page.items) ?? [];

  // Check if there are more pages to load
  const hasNextPage = queryResult.hasNextPage;

  // Get total count from the first page
  const totalCount = queryResult.data?.pages[0]?.total ?? 0;

  return {
    ...queryResult,
    activityLogs: allActivityLogs as ActivityLogType[],
    hasNextPage,
    totalCount,
    loadMore: queryResult.fetchNextPage,
  };
}
