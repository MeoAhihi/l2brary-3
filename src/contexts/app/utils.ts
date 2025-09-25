// App-specific utilities

import { Language, NotificationItem, Theme } from "./types";

/**
 * Theme utilities
 */
export const themeUtils = {
  isValidTheme: (theme: string): theme is Theme => {
    return ["light", "dark", "system"].includes(theme);
  },

  getSystemTheme: (): Theme => {
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  },

  applyTheme: (theme: Theme) => {
    const root = document.documentElement;
    const systemTheme = themeUtils.getSystemTheme();

    root.classList.remove("light", "dark");

    const appliedTheme = theme === "system" ? systemTheme : theme;
    root.classList.add(appliedTheme);

    // Store theme preference
    localStorage.setItem("app-theme", theme);
  },
};

/**
 * Language utilities
 */
export const languageUtils = {
  isValidLanguage: (lang: string): lang is Language => {
    return ["vi", "en"].includes(lang);
  },

  getBrowserLanguage: (): Language => {
    if (typeof navigator === "undefined") return "vi";
    const browserLang = navigator.language.split("-")[0];
    return languageUtils.isValidLanguage(browserLang) ? browserLang : "vi";
  },

  applyLanguage: (language: Language) => {
    document.documentElement.lang = language;
    localStorage.setItem("app-language", language);
  },
};

/**
 * Notification utilities
 */
export const notificationUtils = {
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
 * Modal utilities
 */
export const modalUtils = {
  isModalOpen: (modals: Record<string, boolean>, modalId: string): boolean => {
    return modals[modalId] || false;
  },

  getOpenModals: (modals: Record<string, boolean>): string[] => {
    return Object.entries(modals)
      .filter(([, isOpen]) => isOpen)
      .map(([modalId]) => modalId);
  },
};

/**
 * Loading utilities
 */
export const loadingUtils = {
  hasAnyLoading: (loading: { global: boolean; page: boolean }): boolean => {
    return loading.global || loading.page;
  },

  setGlobalLoading: (
    loading: { global: boolean; page: boolean },
    globalLoading: boolean,
  ) => ({
    global: globalLoading,
    page: loading.page,
  }),

  setPageLoading: (
    loading: { global: boolean; page: boolean },
    pageLoading: boolean,
  ) => ({
    global: loading.global,
    page: pageLoading,
  }),
};
