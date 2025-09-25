// App module types

export type Theme = "light" | "dark" | "system";
export type Language = "vi" | "en";

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

export interface AppState {
  theme: Theme;
  language: Language;
  notifications: NotificationItem[];
  sidebarOpen: boolean;
  loading: {
    global: boolean;
    page: boolean;
  };
  modals: Record<string, boolean>;
}

export type AppAction =
  | { type: "SET_THEME"; payload: Theme }
  | { type: "SET_LANGUAGE"; payload: Language }
  | { type: "TOGGLE_SIDEBAR" }
  | { type: "SET_SIDEBAR"; payload: boolean }
  | {
      type: "ADD_NOTIFICATION";
      payload: Omit<NotificationItem, "id" | "timestamp">;
    }
  | { type: "REMOVE_NOTIFICATION"; payload: string }
  | { type: "CLEAR_NOTIFICATIONS" }
  | { type: "SET_GLOBAL_LOADING"; payload: boolean }
  | { type: "SET_PAGE_LOADING"; payload: boolean }
  | { type: "OPEN_MODAL"; payload: string }
  | { type: "CLOSE_MODAL"; payload: string }
  | { type: "CLOSE_ALL_MODALS" };
