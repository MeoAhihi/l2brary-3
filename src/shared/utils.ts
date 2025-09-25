// Shared utilities across all contexts

import { FieldError, FormState, NotificationItem } from "./types";

/**
 * Common validation utilities
 */
export const validationUtils = {
  /**
   * Check if a string is a valid email
   */
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Check if a string is a valid phone number (Vietnamese format)
   */
  isValidPhoneNumber: (phone: string): boolean => {
    const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
    return phoneRegex.test(phone);
  },

  /**
   * Check if a string meets minimum length requirement
   */
  hasMinLength: (str: string, minLength: number): boolean => {
    return str.length >= minLength;
  },

  /**
   * Check if a string meets maximum length requirement
   */
  hasMaxLength: (str: string, maxLength: number): boolean => {
    return str.length <= maxLength;
  },

  /**
   * Check if a value is not null, undefined, or empty string
   */
  isNotEmpty: (value: any): boolean => {
    return value !== null && value !== undefined && value !== "";
  },

  /**
   * Check if an array is not empty
   */
  isArrayNotEmpty: (arr: any[]): boolean => {
    return Array.isArray(arr) && arr.length > 0;
  },
};

/**
 * Common formatting utilities
 */
export const formatUtils = {
  /**
   * Format date to locale string
   */
  formatDate: (date: Date | string, locale = "vi-VN"): string => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString(locale);
  },

  /**
   * Format date and time to locale string
   */
  formatDateTime: (date: Date | string, locale = "vi-VN"): string => {
    const dateObj = new Date(date);
    return dateObj.toLocaleString(locale);
  },

  /**
   * Format currency in Vietnamese Dong
   */
  formatCurrency: (amount: number, locale = "vi-VN"): string => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "VND",
    }).format(amount);
  },

  /**
   * Format number with thousand separators
   */
  formatNumber: (num: number, locale = "vi-VN"): string => {
    return new Intl.NumberFormat(locale).format(num);
  },

  /**
   * Truncate text to specified length
   */
  truncateText: (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  },

  /**
   * Capitalize first letter of string
   */
  capitalize: (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  },

  /**
   * Convert string to title case
   */
  toTitleCase: (str: string): string => {
    return str.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
    );
  },
};

/**
 * Common storage utilities
 */
export const storageUtils = {
  /**
   * Safely get item from localStorage
   */
  getFromStorage: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error(`Error reading from localStorage key "${key}":`, error);
      return null;
    }
  },

  /**
   * Safely set item to localStorage
   */
  setToStorage: (key: string, value: string): boolean => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error);
      return false;
    }
  },

  /**
   * Safely remove item from localStorage
   */
  removeFromStorage: (key: string): boolean => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing from localStorage key "${key}":`, error);
      return false;
    }
  },

  /**
   * Safely get parsed JSON from localStorage
   */
  getJSONFromStorage: <T>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(
        `Error parsing JSON from localStorage key "${key}":`,
        error,
      );
      return defaultValue;
    }
  },

  /**
   * Safely set JSON to localStorage
   */
  setJSONToStorage: <T>(key: string, value: T): boolean => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error storing JSON to localStorage key "${key}":`, error);
      return false;
    }
  },
};

/**
 * Common form utilities
 */
export const formUtils = {
  /**
   * Create initial form state
   */
  createInitialFormState: (): FormState => ({
    isSubmitting: false,
    isDirty: false,
    isValid: true,
    errors: [],
    submitCount: 0,
  }),

  /**
   * Create field error
   */
  createFieldError: (field: string, message: string): FieldError => ({
    field,
    message,
  }),

  /**
   * Validate required field
   */
  validateRequired: (value: any, fieldName: string): FieldError | null => {
    if (!validationUtils.isNotEmpty(value)) {
      return formUtils.createFieldError(fieldName, `${fieldName} là bắt buộc`);
    }
    return null;
  },

  /**
   * Validate email field
   */
  validateEmail: (value: string, fieldName: string): FieldError | null => {
    if (!validationUtils.isNotEmpty(value)) {
      return formUtils.createFieldError(fieldName, `${fieldName} là bắt buộc`);
    }
    if (!validationUtils.isValidEmail(value)) {
      return formUtils.createFieldError(
        fieldName,
        `${fieldName} không đúng định dạng`,
      );
    }
    return null;
  },

  /**
   * Validate phone field
   */
  validatePhone: (value: string, fieldName: string): FieldError | null => {
    if (!validationUtils.isNotEmpty(value)) {
      return formUtils.createFieldError(fieldName, `${fieldName} là bắt buộc`);
    }
    if (!validationUtils.isValidPhoneNumber(value)) {
      return formUtils.createFieldError(
        fieldName,
        `${fieldName} không đúng định dạng`,
      );
    }
    return null;
  },
};

/**
 * Common notification utilities
 */
export const notificationUtils = {
  /**
   * Create success notification
   */
  createSuccess: (
    title: string,
    message?: string,
    duration = 5000,
    action?: NotificationItem["action"],
  ): Omit<NotificationItem, "id" | "timestamp"> => ({
    type: "success",
    title,
    message,
    duration,
    action,
  }),

  /**
   * Create error notification
   */
  createError: (
    title: string,
    message?: string,
    duration = 7000,
    action?: NotificationItem["action"],
  ): Omit<NotificationItem, "id" | "timestamp"> => ({
    type: "error",
    title,
    message,
    duration,
    action,
  }),

  /**
   * Create warning notification
   */
  createWarning: (
    title: string,
    message?: string,
    duration = 6000,
    action?: NotificationItem["action"],
  ): Omit<NotificationItem, "id" | "timestamp"> => ({
    type: "warning",
    title,
    message,
    duration,
    action,
  }),

  /**
   * Create info notification
   */
  createInfo: (
    title: string,
    message?: string,
    duration = 5000,
    action?: NotificationItem["action"],
  ): Omit<NotificationItem, "id" | "timestamp"> => ({
    type: "info",
    title,
    message,
    duration,
    action,
  }),
};

/**
 * Common async utilities
 */
export const asyncUtils = {
  /**
   * Sleep for specified milliseconds
   */
  sleep: (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },

  /**
   * Retry function with exponential backoff
   */
  retry: async <T>(
    fn: () => Promise<T>,
    maxAttempts = 3,
    baseDelay = 1000,
  ): Promise<T> => {
    let lastError: Error;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error as Error;

        if (attempt === maxAttempts) {
          break;
        }

        const delay = baseDelay * Math.pow(2, attempt - 1);
        await asyncUtils.sleep(delay);
      }
    }

    throw lastError!;
  },

  /**
   * Timeout wrapper for promises
   */
  withTimeout: <T>(promise: Promise<T>, timeoutMs: number): Promise<T> => {
    return Promise.race([
      promise,
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Operation timed out")), timeoutMs),
      ),
    ]);
  },
};

/**
 * Common object utilities
 */
export const objectUtils = {
  /**
   * Deep clone an object
   */
  deepClone: <T>(obj: T): T => {
    return JSON.parse(JSON.stringify(obj));
  },

  /**
   * Check if two objects are equal
   */
  isEqual: (obj1: any, obj2: any): boolean => {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  },

  /**
   * Pick specific keys from object
   */
  pick: <T extends Record<string, any>, K extends keyof T>(
    obj: T,
    keys: K[],
  ): Pick<T, K> => {
    const result = {} as Pick<T, K>;
    keys.forEach((key) => {
      if (key in obj) {
        result[key] = obj[key];
      }
    });
    return result;
  },

  /**
   * Omit specific keys from object
   */
  omit: <T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
    const result = { ...obj };
    keys.forEach((key) => delete result[key]);
    return result;
  },
};
