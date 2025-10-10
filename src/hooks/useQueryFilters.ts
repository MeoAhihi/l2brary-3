"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

import { DEFAULT_PAGE_SIZE } from "@/constants/common";
import { QUERY_PARAMS } from "@/constants/query-params";
import { QueryParams } from "@/types/query";

export const useQueryFilters = (
  defaultParams: QueryParams = { page: 1, limit: DEFAULT_PAGE_SIZE },
) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const queryParams = useMemo(() => {
    const params: QueryParams = { ...defaultParams };
    for (const [key, value] of searchParams.entries()) {
      if (key === QUERY_PARAMS.PAGE || key === QUERY_PARAMS.LIMIT) {
        params[key] = Number(value);
      } else {
        params[key] = value;
      }
    }
    return params;
  }, [searchParams, defaultParams]);

  const setQueryParams = useCallback(
    (newParams: Partial<QueryParams>) => {
      const currentParams = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(newParams)) {
        if (value === undefined || value === null) {
          currentParams.delete(key);
        } else {
          currentParams.set(key, String(value));
        }
      }
      router.push(`${pathname}?${currentParams.toString()}`);
    },
    [searchParams, pathname, router],
  );

  return { queryParams, setQueryParams };
};
