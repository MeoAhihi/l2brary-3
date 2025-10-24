import axiosClient from "@/connectors/AxiosRestConnector";
import {
  GetAllUserResponse,
  GetAllUsersPayload,
} from "@/types/user/get-all.api.dto";
import { GetOneUserResponse } from "@/types/user/get-one.api.dto";
import {
  UpdateProfileDto,
  UpdateUserDto,
  UpdateUserResponse,
} from "@/types/user/update-user.api.dto";

export const getAllUsers = (payload: GetAllUsersPayload) => {
  return axiosClient.get<GetAllUserResponse>("/user", {
    params: payload,
  });
};

export const getUserById = (id: string) => {
  return axiosClient.get<GetOneUserResponse>(`/user/${id}`);
};

export const adminModifyUserProfile = (id: string, data: UpdateUserDto) => {
  return axiosClient.patch<UpdateUserResponse>(`/user/${id}`, data);
};

export const deleteUser = (id: string) => {
  return axiosClient.delete<void>(`/user/${id}`);
};

export const assignRoleToUser = (id: string, roleId: string) => {
  return axiosClient.post<void>(`/user/${id}/roles/${roleId}/assign`);
};

export const unassignRoleFromUser = (id: string, roleId: string) => {
  return axiosClient.post<void>(`/user/${id}/roles/${roleId}/unassign`);
};

export const updateProfile = (data: UpdateProfileDto) => {
  return axiosClient.patch<GetOneUserResponse>("/user", data);
};
