import { PaginationPayload, PaginationResponse } from "@/types/pagination";

import { Gender } from "../gender.enum";

/**
 * Payload for getting all users with optional filters and sorting.
 */
export type GetAllUsersPayload = PaginationPayload & {
  /**
   * Filter by gender (optional)
   */
  gender?: Gender;

  /**
   * Filter by user ranks (optional)
   * Example: ["admin", "user"]
   */
  ranks?: string[];

  /**
   * Sort by rank (optional)
   * If true, results will be sorted by rank.
   */
  sortByRank?: boolean;
};

/**
 * User item returned in the get all users API.
 */
export type UsersItem = {
  id: string;
  avatarUrl: string;
  fullName: string;
  internationalName: string;
  gender: Gender;
  birthdate: string;
  phoneNumber: string;
  email: string;
  rank: string | null;
  courseCertificates: string[] | null;
  eventCertificates: string[] | null;
  experiences: string[] | null;
  createdAt: string;
  updatedAt: string;
};

export type GetAllUserResponse = PaginationResponse<UsersItem>;
