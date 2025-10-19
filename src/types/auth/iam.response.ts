/* eslint-disable no-unused-vars */

import { Gender } from "../gender.enum";

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
  avatarUrl: string;
  fullName: string;
  internationalName: string;
  gender: Gender;
  birthdate: string;
  phoneNumber: string;
  email: string;
  rank: string;
  courseCertificates: string[];
  eventCertificates: string[];
  experiences: string[];
  createdAt: string;
  updatedAt: string;
  roles: Array<Role>;
}
