// Stamp types
export type StampType = {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
};

export type StudentStamp = {
  id: number;
  name: string;
  internationalName: string;
  avatar: string;
  stamps: number;
  stampTypeId: string;
};

export type Session = {
  id: string;
  thumbnail?: string;
  title: string;
  courseId: string;
  startTime: Date;
  endTime?: Date;
  presenter?: string;
  attended: number;
};

export type Courses = {
  id: string;
  thumbnail: string; // URL to the course thumbnail image
  title: string;
  classGroup: string;
  recurrentRule: string; // e.g., "Every Monday", "Biweekly (Friday)", etc.
  time: string; // ISO string or time, e.g., "09:00 - 11:00"
};
