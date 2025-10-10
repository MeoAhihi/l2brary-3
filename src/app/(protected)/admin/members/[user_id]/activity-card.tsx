"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Timeline,
  TimelineItem,
  TimelineHeader,
  TimelineTime,
  TimelineTitle,
  TimelineDescription,
} from "@/components/ui/timeline";
import { useInfiniteActivityLogsQuery } from "@/hooks";
import { formatDateTimeToYMDHM } from "@/lib/datetime";
import type { ActivityLogType } from "@/types/activities/gamification";

type TimelineDataItem = {
  id: string | number;
  time: string;
  title: string;
  description?: string;
};

type ActivityCardProps = {
  userId: string;
};

// Helper function to map ActivityLogType to TimelineDataItem
function mapActivityLogToTimelineItem(log: ActivityLogType): TimelineDataItem {
  return {
    id: log.id,
    time: formatDateTimeToYMDHM(log.createdAt) || "N/A",
    title: log.activity.name,
    description: log.note,
  };
}

export function ActivityCard({ userId }: ActivityCardProps) {
  const {
    activityLogs,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    loadMore,
    error,
  } = useInfiniteActivityLogsQuery({ userId, limit: 30 });

  const timelineData: TimelineDataItem[] = activityLogs.map(
    mapActivityLogToTimelineItem,
  );
  // Handle loading state
  if (isLoading) {
    return (
      <Card>
        <CardContent>
          <h2 className="mb-4 text-2xl font-medium">Hoạt động Gần đây</h2>
          <div className="text-muted-foreground mt-8 text-center">
            Đang tải dữ liệu...
          </div>
        </CardContent>
      </Card>
    );
  }

  // Handle error state
  if (error) {
    return (
      <Card>
        <CardContent>
          <h2 className="mb-4 text-2xl font-medium">Hoạt động Gần đây</h2>
          <div className="text-destructive mt-8 text-center">
            Có lỗi xảy ra khi tải dữ liệu hoạt động.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <h2 className="mb-4 text-2xl font-medium">Hoạt động Gần đây</h2>

        {timelineData.length === 0 ? (
          <div className="text-muted-foreground mt-8 text-center">
            Chưa có hoạt động nào được ghi nhận.
          </div>
        ) : (
          <>
            <Timeline className="mt-8">
              {timelineData.map((item, index) => (
                <TimelineItem key={`activity-${item.id}-${index}`}>
                  <TimelineHeader>
                    <TimelineTime>{item.time}</TimelineTime>
                    <TimelineTitle>{item.title}</TimelineTitle>
                  </TimelineHeader>
                  {item.description && (
                    <TimelineDescription>
                      {item.description}
                    </TimelineDescription>
                  )}
                </TimelineItem>
              ))}
            </Timeline>

            {/* Load More Button */}
            {/* {hasNextPage && (
              <div className="mt-6 text-center">
                <Button
                  variant="outline"
                  onClick={() => loadMore()}
                  disabled={isFetchingNextPage}
                >
                  {isFetchingNextPage ? "Đang tải..." : "Tải thêm"}
                </Button>
              </div>
            )} */}
          </>
        )}
      </CardContent>
    </Card>
  );
}
