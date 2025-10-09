/**
 * Basic pagination payload type.
 */
export type PaginationPayload = {
  /**
   * The page number (1-based).
   */
  page?: number;
  /**
   * The number of items per page.
   */
  limit?: number;
};

/**
 * Basic pagination response type.
 */
export type PaginationResponse<T> = {
  /**
   * The items for the current page.
   */
  items: T[];
  /**
   * The current page number (1-based).
   */
  page: number;
  /**
   * The number of items per page.
   */
  limit: number;
  /**
   * The total number of pages.
   */
  pageCount: number;
  /**
   * The total number of items across all pages.
   */
  pageTotal: number;
};

/**
 * Basic pagination response type.
 */
export type PaginationResponse2<T> = {
  /**
   * The items for the current page.
   */
  data: T[];
  /**
   * The current page number (1-based).
   */
  page: number;
  /**
   * The number of items per page.
   */
  limit: number;
  /**
   * The total number of pages.
   */
  pageCount: number;
  /**
   * The total number of items across all pages.
   */
  pageTotal: number;
};
