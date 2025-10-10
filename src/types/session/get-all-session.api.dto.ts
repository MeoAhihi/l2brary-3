import { SessionDto } from "./session.dto";

export type GetAllSessionPayload = {
  courseId: string;
  page?: number;
  limit?: number;
};

export type GetAllSessionResponse = {
  data: SessionDto[];
  total: number;
  totalPage: number;
};
