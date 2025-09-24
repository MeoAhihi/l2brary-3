"use client";

import { useQueryClient } from "@tanstack/react-query";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";

import { AppSettings, DataAction, DataState, UserPreferences } from "./types";
import {
  cacheUtils,
  preferencesUtils,
  storageUtils,
  syncUtils,
  validationUtils,
} from "./utils";

// Initial state
const initialUserPreferences: UserPreferences =
  preferencesUtils.getDefaultPreferences();
const initialAppSettings: AppSettings = preferencesUtils.getDefaultSettings();

const initialState: DataState = {
  userPreferences: initialUserPreferences,
  appSettings: initialAppSettings,
  cache: new Map(),
  lastSync: null,
  isOnline: true,
};

// Reducer
function dataReducer(state: DataState, action: DataAction): DataState {
  switch (action.type) {
    case "SET_USER_PREFERENCES":
      return {
        ...state,
        userPreferences: {
          ...state.userPreferences,
          ...action.payload,
        },
      };
    case "RESET_USER_PREFERENCES":
      return {
        ...state,
        userPreferences: initialUserPreferences,
      };
    case "SET_APP_SETTINGS":
      return {
        ...state,
        appSettings: {
          ...state.appSettings,
          ...action.payload,
        },
      };
    case "SET_CACHE":
      const newCache = new Map(state.cache);
      newCache.set(action.payload.key, action.payload.value);
      return {
        ...state,
        cache: newCache,
      };
    case "CLEAR_CACHE":
      const clearedCache = new Map(state.cache);
      if (action.payload) {
        clearedCache.delete(action.payload);
      }
      return {
        ...state,
        cache: clearedCache,
      };
    case "CLEAR_ALL_CACHE":
      return {
        ...state,
        cache: new Map(),
      };
    case "SET_LAST_SYNC":
      return {
        ...state,
        lastSync: action.payload,
      };
    case "SET_ONLINE_STATUS":
      return {
        ...state,
        isOnline: action.payload,
      };
    case "BULK_UPDATE":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

// Context
interface DataContextType extends DataState {
  setUserPreferences: (preferences: Partial<UserPreferences>) => void;
  resetUserPreferences: () => void;
  setAppSettings: (settings: Partial<AppSettings>) => void;
  setCache: (key: string, value: any) => void;
  getCache: (key: string) => any;
  clearCache: (key?: string) => void;
  clearAllCache: () => void;
  setLastSync: (timestamp: Date) => void;
  setOnlineStatus: (isOnline: boolean) => void;
  bulkUpdate: (updates: Partial<DataState>) => void;
  syncWithServer: () => Promise<void>;
  // Utility functions
  createCacheKey: (namespace: string, ...parts: (string | number)[]) => string;
  checkOnlineStatus: () => boolean;
  shouldSync: (interval?: number) => boolean;
  validatePreferences: (preferences: Partial<UserPreferences>) => boolean;
  validateSettings: (settings: Partial<AppSettings>) => boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Provider
interface DataProviderProps {
  children: ReactNode;
}

export function DataProvider({ children }: DataProviderProps) {
  const [state, dispatch] = useReducer(dataReducer, initialState);
  const queryClient = useQueryClient();

  // Load data from localStorage on mount
  useEffect(() => {
    const loadStoredData = () => {
      try {
        const storedPreferences =
          storageUtils.getFromStorage("user-preferences");
        const storedSettings = storageUtils.getFromStorage("app-settings");
        const storedCache = storageUtils.getFromStorage("data-cache");

        if (
          storedPreferences &&
          validationUtils.isValidJSON(storedPreferences)
        ) {
          const preferences = JSON.parse(storedPreferences);
          if (preferencesUtils.validatePreferences(preferences)) {
            dispatch({ type: "SET_USER_PREFERENCES", payload: preferences });
          }
        }

        if (storedSettings && validationUtils.isValidJSON(storedSettings)) {
          const settings = JSON.parse(storedSettings);
          if (preferencesUtils.validateSettings(settings)) {
            dispatch({ type: "SET_APP_SETTINGS", payload: settings });
          }
        }

        if (storedCache && validationUtils.isValidJSON(storedCache)) {
          const cacheData = JSON.parse(storedCache) as [string, any][];
          const cache = new Map<string, any>(cacheData);
          dispatch({ type: "BULK_UPDATE", payload: { cache } });
        }
      } catch (error) {
        console.error("Error loading stored data:", error);
      }
    };

    loadStoredData();
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    try {
      storageUtils.setToStorage(
        "user-preferences",
        cacheUtils.serialize(state.userPreferences),
      );
    } catch (error) {
      console.error("Error saving user preferences:", error);
    }
  }, [state.userPreferences]);

  useEffect(() => {
    try {
      storageUtils.setToStorage(
        "app-settings",
        cacheUtils.serialize(state.appSettings),
      );
    } catch (error) {
      console.error("Error saving app settings:", error);
    }
  }, [state.appSettings]);

  useEffect(() => {
    try {
      storageUtils.setToStorage(
        "data-cache",
        cacheUtils.serialize(Array.from(state.cache.entries())),
      );
    } catch (error) {
      console.error("Error saving cache:", error);
    }
  }, [state.cache]);

  // Online/offline detection
  useEffect(() => {
    const handleOnline = () =>
      dispatch({ type: "SET_ONLINE_STATUS", payload: true });
    const handleOffline = () =>
      dispatch({ type: "SET_ONLINE_STATUS", payload: false });

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const setUserPreferences = (preferences: Partial<UserPreferences>) => {
    dispatch({ type: "SET_USER_PREFERENCES", payload: preferences });
  };

  const resetUserPreferences = () => {
    dispatch({ type: "RESET_USER_PREFERENCES" });
  };

  const setAppSettings = (settings: Partial<AppSettings>) => {
    dispatch({ type: "SET_APP_SETTINGS", payload: settings });
  };

  const setCache = (key: string, value: any) => {
    dispatch({ type: "SET_CACHE", payload: { key, value } });
  };

  const getCache = (key: string) => {
    return state.cache.get(key);
  };

  const clearCache = (key?: string) => {
    dispatch({ type: "CLEAR_CACHE", payload: key });
  };

  const clearAllCache = () => {
    dispatch({ type: "CLEAR_ALL_CACHE" });
  };

  const setLastSync = (timestamp: Date) => {
    syncUtils.setLastSyncTime(timestamp);
    dispatch({ type: "SET_LAST_SYNC", payload: timestamp });
  };

  const setOnlineStatus = (isOnline: boolean) => {
    dispatch({ type: "SET_ONLINE_STATUS", payload: isOnline });
  };

  const bulkUpdate = (updates: Partial<DataState>) => {
    dispatch({ type: "BULK_UPDATE", payload: updates });
  };

  const syncWithServer = async () => {
    if (!state.isOnline) {
      throw new Error("Cannot sync while offline");
    }

    try {
      // Invalidate all queries to refetch fresh data
      await queryClient.invalidateQueries();

      // Update last sync timestamp
      const now = new Date();
      setLastSync(now);

      // Clear cache to ensure fresh data
      dispatch({ type: "CLEAR_ALL_CACHE" });
    } catch (error) {
      console.error("Sync failed:", error);
      throw error;
    }
  };

  const value: DataContextType = {
    ...state,
    setUserPreferences,
    resetUserPreferences,
    setAppSettings,
    setCache,
    getCache,
    clearCache,
    clearAllCache,
    setLastSync,
    setOnlineStatus,
    bulkUpdate,
    syncWithServer,
    // Utility functions
    createCacheKey: cacheUtils.createKey,
    checkOnlineStatus: syncUtils.isOnline,
    shouldSync: (interval?: number) =>
      syncUtils.shouldSync(state.lastSync, interval),
    validatePreferences: preferencesUtils.validatePreferences,
    validateSettings: preferencesUtils.validateSettings,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

// Hook
export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
