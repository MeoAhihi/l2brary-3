import { useQuery } from "@tanstack/react-query";

import {
  getUsersByAge,
  getUsersByGender,
  getUsersByRank,
} from "@/apis/demographic.api";

export function useUsersByRank() {
  return useQuery({
    queryKey: ["demographic", "rank"],
    queryFn: getUsersByRank,
    select: (data) => data.data,
  });
}

export function useUsersByGender() {
  return useQuery({
    queryKey: ["demographic", "gender"],
    queryFn: getUsersByGender,
    select: (data) => data.data,
  });
}

export function useUsersByAge() {
  return useQuery({
    queryKey: ["demographic", "age"],
    queryFn: getUsersByAge,
    select: (data) => data.data,
  });
}
