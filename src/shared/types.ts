// Shared types across all contexts

/**
 * Common interface for all context states
 */
export interface BaseState {
  readonly isLoading?: boolean;
  readonly error?: string | null;
}

/**
 * Common interface for all context actions
 */
export interface BaseAction {
  readonly type: string;
  readonly payload?: any;
}

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

/**
 * Common loading states
 */
export type LoadingState = "idle" | "loading" | "success" | "error";

/**
 * Common status types
 */
export type Status = "active" | "inactive" | "pending" | "archived";

/**
 * Generic form field error
 */
export interface FieldError {
  field: string;
  message: string;
}

/**
 * Generic form state
 */
export interface FormState {
  isSubmitting: boolean;
  isDirty: boolean;
  isValid: boolean;
  errors: FieldError[];
  submitCount: number;
}

/**
 * Common entity metadata
 */
export interface EntityMetadata {
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  updatedBy?: string;
  version: number;
}

/**
 * Search and filter parameters
 */
export interface SearchParams {
  query?: string;
  filters?: Record<string, any>;
  dateRange?: {
    from: Date;
    to: Date;
  };
}

/**
 * Export format options
 */
export type ExportFormat = "csv" | "excel" | "pdf" | "json";

/**
 * Notification severity levels
 */
export type NotificationSeverity = "low" | "medium" | "high" | "critical";

/**
 * Common UI state
 */
export interface UIState {
  sidebarCollapsed: boolean;
  theme: "light" | "dark" | "system";
  language: string;
  notifications: NotificationItem[];
}

/**
 * Notification item for shared use
 */
export interface NotificationItem {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message?: string;
  timestamp: Date;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}
