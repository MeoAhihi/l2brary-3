export interface ErrorResponse {
  message: string;
  error: string;
  statusCode: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  pageCount: number;
}

export interface ApiError {
  message: string;
  status: number;
  code: string;
  responseData?: any; // Raw response data from API
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ApiResponse<T> = PaginatedResponse<T> | ErrorResponse | any;
