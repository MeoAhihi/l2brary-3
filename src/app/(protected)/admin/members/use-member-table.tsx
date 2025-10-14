import { useState } from "react";

import { useGetAllUsers } from "@/hooks/users";
import type { Member } from "@/types/member/response";

export function useMemberTable() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // The API returns an AxiosResponse, so we need to access .data
  const {
    data: response,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetAllUsers({
    page,
    limit: pageSize,
  });

  // Adjust according to the actual response shape
  const members = response?.data.items ?? [];
  const totalMembers: number =
    (response?.data?.pageCount ?? 0) * (response?.data?.limit ?? 0);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1); // Reset to first page when page size changes
  };

  const paginationProps = {
    pageIndex: page - 1,
    pageSize,
    pageCount: response?.data.pageCount,
  };

  return {
    members,
    totalMembers,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
    handlePageChange,
    handlePageSizeChange,
    paginationProps,
  };
}
