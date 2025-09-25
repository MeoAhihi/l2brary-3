// Data module types

export interface UserPreferences {
  dashboard: {
    defaultView: "overview" | "analytics" | "recent";
    itemsPerPage: number;
    autoRefresh: boolean;
    refreshInterval: number;
  };
  notifications: {
    emailEnabled: boolean;
    pushEnabled: boolean;
    soundEnabled: boolean;
    categories: {
      courses: boolean;
      sessions: boolean;
      system: boolean;
      social: boolean;
    };
  };
  appearance: {
    compactMode: boolean;
    showAnimations: boolean;
    fontSize: "small" | "medium" | "large";
    density: "compact" | "comfortable" | "spacious";
  };
  accessibility: {
    reducedMotion: boolean;
    highContrast: boolean;
    focusVisible: boolean;
  };
}

export interface AppSettings {
  maintenanceMode: boolean;
  registrationEnabled: boolean;
  features: {
    analytics: boolean;
    gamification: boolean;
    socialFeatures: boolean;
    advancedReporting: boolean;
  };
  limits: {
    maxMembersPerGroup: number;
    maxCoursesPerUser: number;
    maxFileSize: number;
    maxStoragePerUser: number;
  };
}

export interface DataState {
  userPreferences: UserPreferences;
  appSettings: AppSettings;
  cache: Map<string, any>;
  lastSync: Date | null;
  isOnline: boolean;
}

export type DataAction =
  | { type: "SET_USER_PREFERENCES"; payload: Partial<UserPreferences> }
  | { type: "RESET_USER_PREFERENCES" }
  | { type: "SET_APP_SETTINGS"; payload: Partial<AppSettings> }
  | { type: "SET_CACHE"; payload: { key: string; value: any } }
  | { type: "CLEAR_CACHE"; payload?: string }
  | { type: "CLEAR_ALL_CACHE" }
  | { type: "SET_LAST_SYNC"; payload: Date }
  | { type: "SET_ONLINE_STATUS"; payload: boolean }
  | { type: "BULK_UPDATE"; payload: Partial<DataState> };
