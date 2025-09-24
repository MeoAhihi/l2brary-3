"use client";

import { useTheme } from "next-themes";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";

import {
  AppAction,
  AppState,
  Language,
  NotificationItem,
  Theme,
} from "./types";
import {
  languageUtils,
  loadingUtils,
  modalUtils,
  notificationUtils,
  themeUtils,
} from "./utils";

// Initial state
const initialState: AppState = {
  theme: "system",
  language: "vi",
  notifications: [],
  sidebarOpen: false,
  loading: {
    global: false,
    page: false,
  },
  modals: {},
};

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_THEME":
      return {
        ...state,
        theme: action.payload,
      };
    case "SET_LANGUAGE":
      return {
        ...state,
        language: action.payload,
      };
    case "TOGGLE_SIDEBAR":
      return {
        ...state,
        sidebarOpen: !state.sidebarOpen,
      };
    case "SET_SIDEBAR":
      return {
        ...state,
        sidebarOpen: action.payload,
      };
    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            ...action.payload,
            id: Date.now().toString(),
            timestamp: new Date(),
          },
        ],
      };
    case "REMOVE_NOTIFICATION":
      return {
        ...state,
        notifications: state.notifications.filter(
          (n) => n.id !== action.payload,
        ),
      };
    case "CLEAR_NOTIFICATIONS":
      return {
        ...state,
        notifications: [],
      };
    case "SET_GLOBAL_LOADING":
      return {
        ...state,
        loading: loadingUtils.setGlobalLoading(state.loading, action.payload),
      };
    case "SET_PAGE_LOADING":
      return {
        ...state,
        loading: loadingUtils.setPageLoading(state.loading, action.payload),
      };
    case "OPEN_MODAL":
      return {
        ...state,
        modals: {
          ...state.modals,
          [action.payload]: true,
        },
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        modals: {
          ...state.modals,
          [action.payload]: false,
        },
      };
    case "CLOSE_ALL_MODALS":
      return {
        ...state,
        modals: {},
      };
    default:
      return state;
  }
}

// Context
interface AppContextType extends AppState {
  setTheme: (theme: Theme) => void;
  setLanguage: (language: Language) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  addNotification: (
    notification: Omit<NotificationItem, "id" | "timestamp">,
  ) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  setGlobalLoading: (loading: boolean) => void;
  setPageLoading: (loading: boolean) => void;
  openModal: (modalId: string) => void;
  closeModal: (modalId: string) => void;
  closeAllModals: () => void;
  isModalOpen: (modalId: string) => boolean;
  // Utility functions
  hasAnyLoading: () => boolean;
  getOpenModals: () => string[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider
interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { theme: nextTheme, setTheme: setNextTheme } = useTheme();

  // Sync with next-themes
  useEffect(() => {
    if (nextTheme && nextTheme !== state.theme) {
      dispatch({ type: "SET_THEME", payload: nextTheme as Theme });
    }
  }, [nextTheme, state.theme]);

  // Load saved preferences from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem("app-language") as Language;
    const savedSidebarOpen = localStorage.getItem("sidebar-open");

    if (
      savedLanguage &&
      languageUtils.isValidLanguage(savedLanguage) &&
      savedLanguage !== state.language
    ) {
      dispatch({ type: "SET_LANGUAGE", payload: savedLanguage });
    }

    if (savedSidebarOpen !== null) {
      dispatch({ type: "SET_SIDEBAR", payload: savedSidebarOpen === "true" });
    }
  }, []);

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem("app-language", state.language);
  }, [state.language]);

  useEffect(() => {
    localStorage.setItem("sidebar-open", state.sidebarOpen.toString());
  }, [state.sidebarOpen]);

  const setTheme = (theme: Theme) => {
    setNextTheme(theme);
    themeUtils.applyTheme(theme);
    dispatch({ type: "SET_THEME", payload: theme });
  };

  const setLanguage = (language: Language) => {
    languageUtils.applyLanguage(language);
    dispatch({ type: "SET_LANGUAGE", payload: language });
  };

  const toggleSidebar = () => {
    dispatch({ type: "TOGGLE_SIDEBAR" });
  };

  const setSidebarOpen = (open: boolean) => {
    dispatch({ type: "SET_SIDEBAR", payload: open });
  };

  const addNotification = (
    notification: Omit<NotificationItem, "id" | "timestamp">,
  ) => {
    dispatch({ type: "ADD_NOTIFICATION", payload: notification });

    // Auto-remove notification after duration
    if (notification.duration) {
      setTimeout(() => {
        dispatch({
          type: "REMOVE_NOTIFICATION",
          payload: Date.now().toString(),
        });
      }, notification.duration);
    }
  };

  const removeNotification = (id: string) => {
    dispatch({ type: "REMOVE_NOTIFICATION", payload: id });
  };

  const clearNotifications = () => {
    dispatch({ type: "CLEAR_NOTIFICATIONS" });
  };

  const setGlobalLoading = (loading: boolean) => {
    dispatch({ type: "SET_GLOBAL_LOADING", payload: loading });
  };

  const setPageLoading = (loading: boolean) => {
    dispatch({ type: "SET_PAGE_LOADING", payload: loading });
  };

  const openModal = (modalId: string) => {
    dispatch({ type: "OPEN_MODAL", payload: modalId });
  };

  const closeModal = (modalId: string) => {
    dispatch({ type: "CLOSE_MODAL", payload: modalId });
  };

  const closeAllModals = () => {
    dispatch({ type: "CLOSE_ALL_MODALS" });
  };

  const isModalOpen = (modalId: string): boolean => {
    return modalUtils.isModalOpen(state.modals, modalId);
  };

  const value: AppContextType = {
    ...state,
    setTheme,
    setLanguage,
    toggleSidebar,
    setSidebarOpen,
    addNotification,
    removeNotification,
    clearNotifications,
    setGlobalLoading,
    setPageLoading,
    openModal,
    closeModal,
    closeAllModals,
    isModalOpen,
    // Utility functions
    hasAnyLoading: () => loadingUtils.hasAnyLoading(state.loading),
    getOpenModals: () => modalUtils.getOpenModals(state.modals),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Hook
export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
