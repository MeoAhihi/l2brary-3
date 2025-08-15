import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses | L2brary",
  description: "Browse available courses and learning opportunities",
};

export default function CoursesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Courses</h1>
        <p className="text-muted-foreground mb-8">
          Discover and enroll in courses to enhance your skills
        </p>
        
        {/* Course catalog will be implemented here */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Course Catalog</h3>
            <p className="text-sm text-muted-foreground">
              Course listing component will be implemented here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
