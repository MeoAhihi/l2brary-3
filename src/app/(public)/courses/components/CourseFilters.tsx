"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QUERY_PARAMS } from "@/constants/query-params";
import { ScheduleTypeEnum } from "@/types/courses/type";
import { useCourseGroupsQuery } from "../hooks/useCourseGroupsQuery";

interface CourseFiltersProps {
  filters: {
    title?: string;
    group?: string;
    scheduleType?: ScheduleTypeEnum;
  };
  onFiltersChange: (filters: {
    title?: string;
    group?: string;
    scheduleType?: ScheduleTypeEnum;
  }) => void;
  onClearFilters: () => void;
}

const scheduleTypeLabels: Record<ScheduleTypeEnum, string> = {
  [ScheduleTypeEnum.Weekly]: "Hàng tuần",
  [ScheduleTypeEnum.Monthly]: "Hàng tháng",
  [ScheduleTypeEnum.LunarMonthly]: "Âm lịch",
  [ScheduleTypeEnum.OneTime]: "Một lần",
  [ScheduleTypeEnum.BiWeekly]: "Cách tuần",
};

export const CourseFilters = ({
  filters,
  onFiltersChange,
  onClearFilters,
}: CourseFiltersProps) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const { data: courseGroups, isLoading: isLoadingGroups } =
    useCourseGroupsQuery();

  const handleFilterChange = (key: string, value: string | undefined) => {
    const newFilters = {
      ...localFilters,
      [key]: value && value !== "all" ? value : undefined,
    };
    setLocalFilters(newFilters);
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
  };

  const handleClearFilters = () => {
    setLocalFilters({});
    onClearFilters();
  };

  const hasActiveFilters = Object.values(filters).some(Boolean);

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Bộ lọc tìm kiếm
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Title Filter */}
          <div className="space-y-2">
            <Label htmlFor="title-filter">Tiêu đề lớp</Label>
            <Input
              id="title-filter"
              placeholder="Search by title..."
              value={localFilters.title || ""}
              onChange={(e) =>
                handleFilterChange(QUERY_PARAMS.TITLE, e.target.value)
              }
            />
          </div>

          {/* Group Filter */}
          <div className="space-y-2">
            <Label htmlFor="group-filter">Phân loại</Label>
            <Select
              value={localFilters.group || "all"}
              onValueChange={(value) =>
                handleFilterChange(QUERY_PARAMS.GROUP, value)
              }
            >
              <SelectTrigger id="group-filter">
                <SelectValue placeholder="Select group..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                {isLoadingGroups ? (
                  <SelectItem value="loading" disabled>
                    Đang tải...
                  </SelectItem>
                ) : (
                  courseGroups?.map((group) => (
                    <SelectItem key={group} value={group}>
                      {group}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Schedule Type Filter */}
          <div className="space-y-2">
            <Label htmlFor="schedule-filter">Loại lớp</Label>
            <Select
              value={localFilters.scheduleType || "all"}
              onValueChange={(value) =>
                handleFilterChange(
                  QUERY_PARAMS.SCHEDULE_TYPE,
                  value as ScheduleTypeEnum,
                )
              }
            >
              <SelectTrigger id="schedule-filter">
                <SelectValue placeholder="Select schedule type..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                {Object.entries(scheduleTypeLabels).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 pt-2">
          <Button
            onClick={handleApplyFilters}
            className="flex items-center gap-2"
          >
            <Search className="h-4 w-4" />
            Áp dụng bộ lọc
          </Button>
          {hasActiveFilters && (
            <Button
              variant="outline"
              onClick={handleClearFilters}
              className="flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Xóa bộ lọc
            </Button>
          )}
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="pt-2">
            <div className="text-muted-foreground mb-2 text-sm">
              Active filters:
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.title && (
                <span className="bg-primary/10 inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm">
                  Tiêu đề: {filters.title}
                  <button
                    onClick={() =>
                      onFiltersChange({ ...filters, title: undefined })
                    }
                    className="hover:text-destructive ml-1"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {filters.group && (
                <span className="bg-primary/10 inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm">
                  Phân loại: {filters.group}
                  <button
                    onClick={() =>
                      onFiltersChange({ ...filters, group: undefined })
                    }
                    className="hover:text-destructive ml-1"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {filters.scheduleType && (
                <span className="bg-primary/10 inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm">
                  Loại lớp: {scheduleTypeLabels[filters.scheduleType]}
                  <button
                    onClick={() =>
                      onFiltersChange({ ...filters, scheduleType: undefined })
                    }
                    className="hover:text-destructive ml-1"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
