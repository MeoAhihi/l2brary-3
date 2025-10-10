import { RefUserDto } from "../user/ref-user.dto";
import { ActivityResponseDto } from "./activity";

export type LogActivityDto = {
  userId: string; // User identifier
  activityId: number; // Activity performed (activity ID)
  note?: string; // Optional note about the activity
  createdAt?: Date; // Date and time of activity
};

export type ActivityLogType = {
  id: number;
  user: RefUserDto;
  activity: ActivityResponseDto;
  loggedBy: string;
  note?: string;
  createdAt: Date;
};

export type GetAllActivityLogsQuery = {
  userId?: string;
  page?: number;
  limit?: number;
};

/**
 * Activity report response for a user.
 */
export type UserActivityReport = {
  userId: string;
  engagementScore: number;
  activityLogs: ActivityLogType[];
};
