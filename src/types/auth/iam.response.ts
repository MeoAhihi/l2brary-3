/* eslint-disable no-unused-vars */

export enum RoleEnum {
  Admin = "admin",
  Monitor = "monitor",
  Member = "member",
}

export interface Role {
  id: string;
  name: RoleEnum;
}

export interface IAMProfileResponse {
  id: string; // UUID
  fullName: string;
  internationalName: string;
  gender: string;
  birthdate: string;
  phoneNumber: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  roles: Array<Role>;
}
