export type MarkAttendanceDto = {
  userIds: string[];
  time?: Date;
};

export type MarkAttendancePayload = {
  id: number;
  data: MarkAttendanceDto;
};
