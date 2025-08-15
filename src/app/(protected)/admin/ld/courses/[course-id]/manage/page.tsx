import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Course | Admin | L2brary",
  description: "Manage course enrollments and settings",
};

interface ManageCoursePageProps {
  params: {
    "course-id": string;
  };
}

export default function ManageCoursePage({ params }: ManageCoursePageProps) {
  const { "course-id": courseId } = params;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Manage Course</h1>
        <p className="text-muted-foreground mb-8">
          Course ID: {courseId}
        </p>
        
        {/* Course management tabs will be implemented here */}
        <div className="space-y-6">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Course Settings</h3>
            <p className="text-sm text-muted-foreground">
              Course configuration and settings will be implemented here
            </p>
          </div>
          
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Enrollments Tab</h3>
            <p className="text-sm text-muted-foreground">
              View and approve enrollment requests will be implemented here
            </p>
          </div>
          
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Content Management</h3>
            <p className="text-sm text-muted-foreground">
              Course content and curriculum management will be implemented here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
