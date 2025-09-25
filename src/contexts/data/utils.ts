// Data-specific utilities

import { AppSettings, UserPreferences } from "./types";

/**
 * Cache utilities
 */
export const cacheUtils = {
  createKey: (namespace: string, ...parts: (string | number)[]): string => {
    return `${namespace}:${parts.join(":")}`;
  },

  serialize: (value: any): string => {
    try {
      return JSON.stringify(value);
    } catch (error) {
      console.error("Error serializing cache value:", error);
      return "";
    }
  },

  deserialize: (value: string): any => {
    try {
      return JSON.parse(value);
    } catch (error) {
      console.error("Error deserializing cache value:", error);
      return null;
    }
  },

  isExpired: (timestamp: number, ttl: number): boolean => {
    return Date.now() - timestamp > ttl;
  },

  setWithTTL: (
    key: string,
    value: any,
    ttl: number,
  ): { key: string; value: any; expiry: number } => {
    const expiry = Date.now() + ttl;
    return { key, value, expiry };
  },
};

/**
 * Storage utilities
 */
export const storageUtils = {
  getFromStorage: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error(`Error reading from localStorage key "${key}":`, error);
      return null;
    }
  },

  setToStorage: (key: string, value: string): boolean => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error);
      return false;
    }
  },

  removeFromStorage: (key: string): boolean => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing from localStorage key "${key}":`, error);
      return false;
    }
  },
};

/**
 * Sync utilities
 */
export const syncUtils = {
  isOnline: (): boolean => {
    return typeof navigator !== "undefined" && navigator.onLine;
  },

  getLastSyncTime: (): Date | null => {
    const stored = storageUtils.getFromStorage("last-sync-time");
    return stored ? new Date(stored) : null;
  },

  setLastSyncTime: (timestamp: Date): boolean => {
    return storageUtils.setToStorage("last-sync-time", timestamp.toISOString());
  },

  shouldSync: (lastSync: Date | null, interval: number = 300000): boolean => {
    if (!lastSync) return true;
    return Date.now() - lastSync.getTime() > interval;
  },
};

/**
 * Preferences utilities
 */
export const preferencesUtils = {
  getDefaultPreferences: (): UserPreferences => ({
    dashboard: {
      defaultView: "overview",
      itemsPerPage: 10,
      autoRefresh: true,
      refreshInterval: 30000, // 30 seconds
    },
    notifications: {
      emailEnabled: true,
      pushEnabled: true,
      soundEnabled: true,
      categories: {
        courses: true,
        sessions: true,
        system: true,
        social: false,
      },
    },
    appearance: {
      compactMode: false,
      showAnimations: true,
      fontSize: "medium",
      density: "comfortable",
    },
    accessibility: {
      reducedMotion: false,
      highContrast: false,
      focusVisible: true,
    },
  }),

  getDefaultSettings: (): AppSettings => ({
    maintenanceMode: false,
    registrationEnabled: true,
    features: {
      analytics: true,
      gamification: true,
      socialFeatures: true,
      advancedReporting: false,
    },
    limits: {
      maxMembersPerGroup: 50,
      maxCoursesPerUser: 10,
      maxFileSize: 10 * 1024 * 1024, // 10MB
      maxStoragePerUser: 100 * 1024 * 1024, // 100MB
    },
  }),

  validatePreferences: (preferences: Partial<UserPreferences>): boolean => {
    // Add validation logic here
    return true;
  },

  validateSettings: (settings: Partial<AppSettings>): boolean => {
    // Add validation logic here
    return true;
  },
};

/**
 * Data validation utilities
 */
export const validationUtils = {
  isValidJSON: (str: string): boolean => {
    try {
      JSON.parse(str);
      return true;
    } catch {
      return false;
    }
  },

  sanitizeKey: (key: string): string => {
    return key.replace(/[^a-zA-Z0-9:_-]/g, "_");
  },

  truncateString: (str: string, maxLength: number): string => {
    return str.length > maxLength ? str.substring(0, maxLength) + "..." : str;
  },
};
