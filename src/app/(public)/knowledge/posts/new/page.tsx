import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create New Post | Knowledge Hub | L2brary",
  description: "Create and publish a new knowledge post",
};

export default function NewPostPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Create New Post</h1>
        <p className="text-muted-foreground mb-8">
          Share your knowledge with the community
        </p>
        
        {/* Post creation form will be implemented here */}
        <div className="space-y-6">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Post Form</h3>
            <p className="text-sm text-muted-foreground">
              Title field and rich-text editor will be implemented here
            </p>
          </div>
          
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Publishing Options</h3>
            <p className="text-sm text-muted-foreground">
              Save as draft or publish options will be implemented here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
