import { UsersItem } from "./get-all.api.dto";

/**
 * DTO for updating a user.
 */
export type UpdateUserDto = {
  /**
   * Full name of the user
   * Example?: "John Doe"
   */
  fullName?: string;

  /**
   * International name of the user
   * Example?: "J. Doe"
   */
  internationalName?: string;

  /**
   * Gender of the user
   * Example?: "male"
   */
  gender?: string;

  /**
   * Birthdate of the user (YYYY-MM-DD)
   * Example?: "2000-01-01"
   */
  birthdate?: string;

  /**
   * Phone number of the user
   * Example?: "+84123456789"
   */
  phoneNumber?: string;

  /**
   * Email address of the user
   * Example?: "john.doe@example.com"
   */
  email?: string;

  /**
   * List of course certificate IDs
   * Example?: ["course-cert-1", "course-cert-2"]
   */
  courseCertificates?: string[] | null;

  /**
   * List of event certificate IDs
   * Example?: ["event-cert-1", "event-cert-2"]
   */
  eventCertificates?: string[] | null;

  /**
   * List of user experiences
   * Example?: ["Intern at Company A", "Volunteer at Event B"]
   */
  experiences?: string[] | null;

  /**
   * User rank
   * Example?: "Junior"
   */
  rank?: string | null;
};

/**
 * Payload for updating a user.
 */
export type UpdateUserPayload = {
  /**
   * The unique identifier of the user to update.
   * Example: "123e4567-e89b-12d3-a456-426614174000"
   */
  id: string;
  /**
   * The data to update for the user.
   */
  data: UpdateUserDto;
};

export type UpdateUserResponse = UsersItem;
