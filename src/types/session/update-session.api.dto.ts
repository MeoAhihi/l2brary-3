export type UpdateSessionDto = {
  thumbnail?: string;
  title?: string;
  description?: string;
  startTime?: Date;
  endTime?: Date;
  presenterName?: string;
  locationType?: string; // use string for LocationTypeEnum here
  roomInfo?: string;
  address?: string;
  maxParticipant?: number;
  lateThreshold?: number;
  autoCheckIn?: boolean;
  allowLateJoin?: boolean;
  enableGame?: boolean;
  autoScoring?: boolean;
  maxGamePerSession?: number;
  gameTimeout?: number;
  emailNotification?: boolean;
  smsNotification?: boolean;
  reminderNotification?: boolean;
};

export type UpdateSessionPayload = {
  id: number;
  data: UpdateSessionDto;
};
