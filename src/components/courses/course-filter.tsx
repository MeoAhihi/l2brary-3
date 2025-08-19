"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function CourseFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set("page", "1"); // reset to first page on filter change
    router.push(`?${params.toString()}`);
  }

  return (
    <div className="flex gap-4 mb-6">
      {/* Category Filter */}
      <Select
        defaultValue={searchParams.get("category") || ""}
        onValueChange={(value) => updateParam("category", value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">All Categories</SelectItem>
          <SelectItem value="Design">Design</SelectItem>
          <SelectItem value="Development">Development</SelectItem>
        </SelectContent>
      </Select>

      {/* Status Filter */}
      <Select
        defaultValue={searchParams.get("status") || ""}
        onValueChange={(value) => updateParam("status", value)}
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="All Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">All Status</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="archived">Archived</SelectItem>
        </SelectContent>
      </Select>

      {/* Search */}
      <Input
        type="text"
        placeholder="Search..."
        defaultValue={searchParams.get("search") || ""}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            updateParam("search", (e.target as HTMLInputElement).value);
          }
        }}
        className="flex-1"
      />
    </div>
  );
}
