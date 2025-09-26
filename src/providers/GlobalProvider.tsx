"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

import { AppProvider } from "../contexts/app";
import { AuthProvider } from "../contexts/auth";
import { DataProvider } from "../contexts/data";
import { QueryProvider } from "./QueryProvider";

interface GlobalProviderProps {
  children: ReactNode;
}

export function GlobalProvider({ children }: GlobalProviderProps) {
  return (
    <QueryProvider>
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
    </QueryProvider>
  );
}
