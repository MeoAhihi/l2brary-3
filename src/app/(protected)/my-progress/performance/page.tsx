import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Performance | L2brary",
  description: "View your personal performance metrics and progress",
};

export default function MyPerformancePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Performance</h1>
        <p className="text-muted-foreground mb-8">
          Track your attendance, scores, and skill development progress
        </p>
        
        {/* Performance dashboard will be implemented here */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Attendance Overview</h3>
            <p className="text-sm text-muted-foreground">
              Attendance statistics will be displayed here
            </p>
          </div>
          
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Skill Scores</h3>
            <p className="text-sm text-muted-foreground">
              Skill development scores will be displayed here
            </p>
          </div>
          
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Progress Charts</h3>
            <p className="text-sm text-muted-foreground">
              Performance charts and graphs will be displayed here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
