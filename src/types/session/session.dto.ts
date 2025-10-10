export type SessionDto = {
  id: number;
  thumbnail?: string;
  title: string;
  course: {
    id: string;
    title: string;
    description: string;
  };
  description?: string;
  startTime: Date;
  endTime?: Date;
  presenterName?: string;
  locationType?: string;
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
  attendances?: {
    id: number;
    // add other attendance fields as needed
  }[];
  games?: {
    id: number;
    // add other game fields as needed
  }[];
  updatedAt: Date;
  status: string;
  checked: number;
  totalGame: number;
};
