import { UsersItem } from "../user/get-all.api.dto";
/**
 * Payload for updating a user profile.
 */
export type UpdateProfilePayload = {
  /**
   * The full name of the user.
   * Example: "John Doe"
   */
  fullName: string;
  /**
   * The internationalized name of the user.
   * Example: "J. Doe"
   */
  internationalName: string;
  /**
   * The gender of the user.
   * Example: "male"
   */
  gender: string;
  /**
   * The birthdate of the user in YYYY-MM-DD format.
   * Example: "2000-01-01"
   */
  birthdate: string;
  /**
   * The phone number of the user.
   * Example: "+84123456789"
   */
  phoneNumber: string;
  /**
   * The email address of the user.
   * Example: "john.doe@example.com"
   */
  email: string;
};

export type UpdateProfileResponse = UsersItem;
