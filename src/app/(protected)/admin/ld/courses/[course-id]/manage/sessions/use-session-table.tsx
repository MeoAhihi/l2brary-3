import { getCourseSessions } from "@/apis/session.api";
import { ADMIN_COURSE_PAGE_SIZE } from "@/constants/common";
import { queryKeys } from "@/constants/query-keys";
import type { GetAllSessionPayload } from "@/types/session/get-all-session.api.dto";
import type { SessionDto } from "@/types/session/session.dto";
import { useTable } from "@/hooks/table";

interface UseSessionsTableOptions {
  defaultPageSize?: number;
  courseId: string;
  forceSkeleton?: boolean;
}

/**
 * Session-specific filter transformation logic
 * Converts generic QueryParams to GetAllSessionPayload for API consumption
 */
const transformSessionFilters = (
  queryParams: Partial<GetAllSessionPayload>,
  courseId: string,
): Partial<GetAllSessionPayload> => {
  const { page, limit } = queryParams;
  return {
    courseId,
    page: page ?? 1,
    limit: limit ?? ADMIN_COURSE_PAGE_SIZE,
  };
};

/**
 * Hook tổng hợp logic cho SessionsTable component
 */
export function useSessionTable(options: UseSessionsTableOptions) {
  const {
    defaultPageSize = ADMIN_COURSE_PAGE_SIZE,
    courseId,
    forceSkeleton,
  } = options;

  const tableState = useTable<Partial<GetAllSessionPayload>, SessionDto>({
    defaultPageSize,
    defaultFilters: { courseId },
    transformFilters: (queryParams) =>
      transformSessionFilters(
        queryParams as Partial<GetAllSessionPayload>,
        courseId,
      ),
    // Wrap API to adapt { items, total } shape
    apiFunction: async (params) => {
      const res = await getCourseSessions(params as GetAllSessionPayload);
      return {
        items: res.data,
        total: res.total,
      };
    },
    queryKeyPrefix: [...queryKeys.ld.sessions, courseId],
    enableSkeleton: true,
    skeletonRowCount: defaultPageSize,
    forceSkeleton,
  });

  return {
    ...tableState,
    sessions: tableState.items,
    totalSessions: tableState.totalItems,
  };
}
