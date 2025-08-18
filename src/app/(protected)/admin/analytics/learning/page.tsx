import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learning Analytics | Admin | L2brary",
  description: "Learning and development analytics dashboard",
};

export default function LearningAnalyticsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Learning Analytics</h1>
        <p className="text-muted-foreground mb-8">
          Track course popularity, enrollment, and attendance statistics
        </p>
        
        {/* Learning analytics dashboard will be implemented here */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Course Popularity</h3>
            <p className="text-sm text-muted-foreground">
              Course enrollment and popularity metrics will be displayed here
            </p>
          </div>
          
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Attendance Statistics</h3>
            <p className="text-sm text-muted-foreground">
              Course attendance and completion rates will be displayed here
            </p>
          </div>
          
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Learning Outcomes</h3>
            <p className="text-sm text-muted-foreground">
              Learning effectiveness and skill development metrics will be displayed here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
