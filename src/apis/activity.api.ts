import axiosClient from "@/connectors/AxiosRestConnector";
import type {
  ActivityCreatePayload,
  ActivityUpdatePayload,
  ActivityResponseDto,
  ActivitiesListResponse,
  ActivityCategory,
} from "@/types/activities/activity";

export const createActivity = async (payload: ActivityCreatePayload) => {
  const { data } = await axiosClient.post<ActivityResponseDto>(
    "/activity",
    payload,
  );
  return data;
};

export const getActivities = async () => {
  const { data } = await axiosClient.get<ActivitiesListResponse>("/activity");
  return data;
};

export const getActivityById = async (id: string | number) => {
  const { data } = await axiosClient.get<ActivityResponseDto>(
    `/activity/${id}`,
  );
  return data;
};

export const updateActivity = async (
  id: string | number,
  payload: ActivityUpdatePayload,
) => {
  const { data } = await axiosClient.patch<ActivityResponseDto>(
    `/activity/${id}`,
    payload,
  );
  return data;
};

export const deleteActivity = async (id: string | number) => {
  const { data } = await axiosClient.delete<void>(`/activity/${id}`);
  return data;
};

export const getActivityCategories = async () => {
  const { data } = await axiosClient.get<ActivityCategory[]>(
    "/activity/categories",
  );
  return data;
};
