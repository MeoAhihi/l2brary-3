import axiosClient from "@/connectors/AxiosRestConnector";
import {
  CountNewUserPayload,
  GetActiveUserPayload,
  GetInactiveUserPayload,
  GetRetentionRatePayload,
} from "@/types/analytics/track-growth.payload.dto";
import { CountingResponse } from "@/types/analytics/track-growth.response.dto";

export async function getTotalUserCount() {
  const response = await axiosClient.get<CountingResponse>(
    "/analytics/track-growth/users/count",
  );
  return response;
}

export async function getNewUsersCount(params: CountNewUserPayload) {
  const response = await axiosClient.get<CountingResponse>(
    "/analytics/track-growth/users/new",
    { params },
  );
  return response;
}

export async function getActiveUsersCount(params: GetActiveUserPayload) {
  const response = await axiosClient.get<CountingResponse>(
    "/analytics/track-growth/users/active/count",
    { params },
  );
  return response;
}

export async function getInactiveUsersCount(params: GetInactiveUserPayload) {
  const response = await axiosClient.get<CountingResponse>(
    "/analytics/track-growth/users/inactive/count",
    { params },
  );
  return response;
}

export async function getUserRetentionRate(params: GetRetentionRatePayload) {
  const response = await axiosClient.get(
    "/analytics/track-growth/users/retention-rate",
    { params },
  );
  return response;
}

export async function getMonthlyUserGrowth() {
  const response = await axiosClient.get(
    "/analytics/track-growth/users/monthly",
  );
  return response;
}
