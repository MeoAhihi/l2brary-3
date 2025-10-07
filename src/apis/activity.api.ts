import axios from "axios";
import { ActivityPayload } from "@/types/activity/payload";
import { ActivityResponse } from "@/types/activity/response";

const API_URL = "/activity";

export const createActivity = async (
  payload: ActivityPayload,
): Promise<ActivityResponse> => {
  const { data } = await axios.post<ActivityResponse>(API_URL, payload);
  return data;
};

export const getAllActivities = async (): Promise<ActivityResponse[]> => {
  const { data } = await axios.get<ActivityResponse[]>(API_URL);
  return data;
};

export const getActivityCategories = async (): Promise<string[]> => {
  const { data } = await axios.get<string[]>(`${API_URL}/categories`);
  return data;
};

export const getActivityById = async (
  id: number,
): Promise<ActivityResponse> => {
  const { data } = await axios.get<ActivityResponse>(`${API_URL}/${id}`);
  return data;
};

export const updateActivity = async (
  id: number,
  payload: ActivityPayload,
): Promise<ActivityResponse> => {
  const { data } = await axios.put<ActivityResponse>(
    `${API_URL}/${id}`,
    payload,
  );
  return data;
};

export const removeActivity = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
