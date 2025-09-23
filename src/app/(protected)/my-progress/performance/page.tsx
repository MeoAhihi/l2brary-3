import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Performance | L2brary",
  description: "View your personal performance metrics and progress",
};

export default function MyPerformancePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-3xl font-bold">My Performance</h1>
        <p className="text-muted-foreground mb-8">
          Track your attendance, scores, and skill development progress
        </p>

        {/* Performance dashboard will be implemented here */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border p-6">
            <h3 className="mb-2 font-semibold">Attendance Overview</h3>
            <p className="text-muted-foreground text-sm">
              Attendance statistics will be displayed here
            </p>
          </div>

          <div className="rounded-lg border p-6">
            <h3 className="mb-2 font-semibold">Skill Scores</h3>
            <p className="text-muted-foreground text-sm">
              Skill development scores will be displayed here
            </p>
          </div>

          <div className="rounded-lg border p-6">
            <h3 className="mb-2 font-semibold">Progress Charts</h3>
            <p className="text-muted-foreground text-sm">
              Performance charts and graphs will be displayed here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
