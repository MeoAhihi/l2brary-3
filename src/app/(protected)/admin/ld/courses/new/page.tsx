import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create New Course | Admin | L2brary",
  description: "Create a new learning course",
};

export default function NewCoursePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Create New Course</h1>
        <p className="text-muted-foreground mb-8">
          Create a new learning course for the community
        </p>
        
        {/* Course creation form will be implemented here */}
        <div className="space-y-6">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Course Information</h3>
            <p className="text-sm text-muted-foreground">
              Course details form will be implemented here
            </p>
          </div>
          
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Course Content</h3>
            <p className="text-sm text-muted-foreground">
              Content management and curriculum setup will be implemented here
            </p>
          </div>
          
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Publishing Options</h3>
            <p className="text-sm text-muted-foreground">
              Course publishing and visibility settings will be implemented here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
