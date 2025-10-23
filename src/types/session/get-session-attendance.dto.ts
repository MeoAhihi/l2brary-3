import { RefUserDto } from "../user/ref-user.dto";

export type GetSessionAttendanceDto = {
  user: RefUserDto; // Replace 'any' with the actual user DTO type if available
  attendTime: Date;
};
