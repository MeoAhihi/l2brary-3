"use client";
// import { Metadata } from "next";
import { ActivityType } from "./columns";
import ActivityTable from "./activity-table";
import PageHeader from "@/components/ui/page-header";
import ActivityForm from "./activity-form";
import { useState } from "react";

// export const metadata: Metadata = {
//   title: "Engagement Settings | Admin | L2brary",
//   description: "Manage activity types and engagement settings",
// };
const mockData: ActivityType[] = [
  { id: "1", name: "Chuẩn bị phòng", engagementScore: 5, category: "Hậu cần" },
  { id: "2", name: "Thuyết trình", engagementScore: 10, category: "Nội dung" },
  { id: "3", name: "Thảo luận nhóm", engagementScore: 7, category: "Hợp tác" },
  { id: "4", name: "Dọn dẹp", engagementScore: 3, category: "Hậu cần" },
];
export default function EngagementSettingsPage() {
  const [selectedActivity, setSelectedActivity] = useState<ActivityType | null>(
    null
  );

  const handleActivitySelect = (activity: ActivityType) => {
    setSelectedActivity(activity);
  };

  const handleFormSubmit = () => {
    // Reset selection after form submission
    setSelectedActivity(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <PageHeader pageTitle="Trung tâm Hoạt động" />
        <p className="text-muted-foreground mb-8">
          Quản lý các loại hoạt động và điều chỉnh điểm tương tác
        </p>
        <div className="mb-8">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h2 className="text-lg font-semibold">
              {selectedActivity ? "Chỉnh sửa hoạt động" : "Thêm hoạt động mới"}
            </h2>
            <ActivityForm
              selectedActivity={selectedActivity}
              onFormSubmit={handleFormSubmit}
              categories={[
                { label: "Hậu cần", value: "Hậu cần" },
                { label: "Nội dung", value: "Nội dung" },
                { label: "Hợp tác", value: "Hợp tác" },
              ]}
            />
          </div>
        </div>
        <ActivityTable
          activities={mockData}
          onActivitySelect={handleActivitySelect}
          selectedActivityId={selectedActivity?.id}
        />
      </div>
    </div>
  );
}
