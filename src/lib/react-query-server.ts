import { DefaultOptions, QueryClient } from "@tanstack/react-query";
import { cache } from "react";

const serverDefaultOptions: DefaultOptions = {
  queries: {
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    retry: 1,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    networkMode: "always",
  },
  mutations: {
    retry: 0,
    networkMode: "always",
  },
};

export const getServerQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: serverDefaultOptions,
    }),
);
