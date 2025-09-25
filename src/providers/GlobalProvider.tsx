"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import React, { ReactNode } from "react";

import { AppProvider } from "../contexts/app";
import { AuthProvider } from "../contexts/auth";
import { DataProvider } from "../contexts/data";

interface GlobalProviderProps {
  children: ReactNode;
  queryClient?: QueryClient;
}

// Create a default query client if not provided
const defaultQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors
        if (error?.status >= 400 && error?.status < 500) {
          return false;
        }
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

export function GlobalProvider({
  children,
  queryClient = defaultQueryClient,
}: GlobalProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <AuthProvider>
          <AppProvider>
            <DataProvider>{children}</DataProvider>
          </AppProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

// Export the default query client for use in other parts of the app
export { defaultQueryClient };
