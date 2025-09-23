import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create New Post | Knowledge Hub | L2brary",
  description: "Create and publish a new knowledge post",
};

export default function NewPostPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-3xl font-bold">Create New Post</h1>
        <p className="text-muted-foreground mb-8">
          Share your knowledge with the community
        </p>

        {/* Post creation form will be implemented here */}
        <div className="space-y-6">
          <div className="rounded-lg border p-6">
            <h3 className="mb-2 font-semibold">Post Form</h3>
            <p className="text-muted-foreground text-sm">
              Title field and rich-text editor will be implemented here
            </p>
          </div>

          <div className="rounded-lg border p-6">
            <h3 className="mb-2 font-semibold">Publishing Options</h3>
            <p className="text-muted-foreground text-sm">
              Save as draft or publish options will be implemented here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
