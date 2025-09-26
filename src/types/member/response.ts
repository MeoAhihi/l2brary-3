import { Role } from "../auth/iam.response";

export interface Member {
  id: string;
  fullname: string;
  international_name: string;
  birthday: string;
  role: Role;
  is_male: boolean;
  group: string;
  school_class: string;
  phone_number: string;
  email: string;
}
