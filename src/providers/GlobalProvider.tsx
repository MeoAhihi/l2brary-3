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
      <AuthProvider>
        <AppProvider>
          <DataProvider>{children}</DataProvider>
        </AppProvider>
      </AuthProvider>
    </QueryProvider>
  );
}
