"use client";
// import { Metadata } from "next";
import { useMemo, useState } from "react";

import PageHeader from "@/components/ui/page-header";

import ActivityForm from "./activity-form";
import ActivityTable from "./activity-table";
import { ActivityType } from "./columns";
import {
  useActivitiesQuery,
  useActivityCategoriesQuery,
  useCreateActivityMutation,
  useUpdateActivityMutation,
} from "@/hooks/activities";
import type { LabelValue } from "@/types/common";

// export const metadata: Metadata = {
//   title: "Engagement Settings | Admin | L2brary",
//   description: "Manage activity types and engagement settings",
// };
export default function EngagementSettingsPage() {
  const [selectedActivity, setSelectedActivity] = useState<ActivityType | null>(
    null,
  );

  // Queries
  const { activities, isLoading: isLoadingActivities } = useActivitiesQuery();
  const { data: categoriesData } = useActivityCategoriesQuery();

  // Mutations
  const createMutation = useCreateActivityMutation();
  const updateMutation = useUpdateActivityMutation();

  // Map API data to table type
  const tableActivities: ActivityType[] = useMemo(
    () =>
      (activities ?? []).map((a) => ({
        id: String(a.id),
        name: a.name,
        engagementScore: a.point,
        category: a.category,
      })),
    [activities],
  );

  const handleActivitySelect = (activity: ActivityType) => {
    setSelectedActivity(activity);
  };

  const handleFormSubmit = async (values?: any) => {
    if (values) {
      const payload = {
        name: values["activity-name"],
        point: Number(values["engagement-score"]),
        category: values.category,
      };

      if (selectedActivity?.id) {
        await updateMutation.mutateAsync({
          id: selectedActivity.id,
          payload,
        });
      } else {
        await createMutation.mutateAsync(payload);
      }
    }

    setSelectedActivity(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <PageHeader pageTitle="Trung tâm Hoạt động" />
        <p className="text-muted-foreground mb-8">
          Quản lý các loại hoạt động và điều chỉnh điểm tương tác
        </p>
        <div className="mb-8">
          <div className="bg-card text-card-foreground rounded-lg border p-6 shadow-sm">
            <h2 className="text-lg font-semibold">
              {selectedActivity ? "Chỉnh sửa hoạt động" : "Thêm hoạt động mới"}
            </h2>
            <ActivityForm
              selectedActivity={selectedActivity}
              onFormSubmit={handleFormSubmit}
              categories={
                (categoriesData ?? []).map<LabelValue>((c) => ({
                  label: c,
                  value: c,
                }))
              }
            />
          </div>
        </div>
        <ActivityTable
          activities={tableActivities}
          onActivitySelect={handleActivitySelect}
          selectedActivityId={selectedActivity?.id}
        />
      </div>
    </div>
  );
}
