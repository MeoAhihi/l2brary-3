import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses | Admin | L2brary",
  description: "Manage all learning & development courses",
};

export default function AdminCoursesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Courses</h1>
        <p className="text-muted-foreground mb-8">
          View and manage all courses in the Learning & Development domain.
        </p>
        {/* Course list will be implemented here */}
        <div className="space-y-4">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Course List</h3>
            <p className="text-sm text-muted-foreground">
              List of courses will be displayed here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
