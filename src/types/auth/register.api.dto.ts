import { Gender } from "../gender.enum";

export type RegisterDto = {
  fullName: string;
  internationalName?: string;
  gender: Gender;
  birthdate?: string;
  phoneNumber: string;
  email?: string;
  password: string;
};

export type RegisterPayload = {
  inviteCode: string;
  data: RegisterDto;
};
