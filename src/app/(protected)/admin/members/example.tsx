import axiosClient from "@/connectors/AxiosRestConnector";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function useExample() {
  const [page, setPage] = useState(1);
  const queryRes = useQuery({
    queryKey: ["members", { page }],
    queryFn: async () =>
      await axiosClient.get("/user", { params: { page, limit: 4 } }),
    select: (res) => res.data,
  });

  return { page, setPage, ...queryRes };
}
