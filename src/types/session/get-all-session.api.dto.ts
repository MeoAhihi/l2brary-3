import { SessionDto } from "./session.dto";

export type GetAllSessionPayload = {
  courseId: string;
  page?: number;
  limit?: number;
};

export type GetAllSessionResponse = {
  items: SessionDto[];
  total: number;
  page: number;
  limit: number;
  totalPage: number;
};
