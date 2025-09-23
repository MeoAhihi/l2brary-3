import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learning Analytics | Admin | L2brary",
  description: "Learning and development analytics dashboard",
};

export default function LearningAnalyticsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-3xl font-bold">Learning Analytics</h1>
        <p className="text-muted-foreground mb-8">
          Track course popularity, enrollment, and attendance statistics
        </p>

        {/* Learning analytics dashboard will be implemented here */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border p-6">
            <h3 className="mb-2 font-semibold">Course Popularity</h3>
            <p className="text-muted-foreground text-sm">
              Course enrollment and popularity metrics will be displayed here
            </p>
          </div>

          <div className="rounded-lg border p-6">
            <h3 className="mb-2 font-semibold">Attendance Statistics</h3>
            <p className="text-muted-foreground text-sm">
              Course attendance and completion rates will be displayed here
            </p>
          </div>

          <div className="rounded-lg border p-6">
            <h3 className="mb-2 font-semibold">Learning Outcomes</h3>
            <p className="text-muted-foreground text-sm">
              Learning effectiveness and skill development metrics will be
              displayed here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
