import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Knowledge Post | L2brary",
  description: "Read knowledge post content",
};

interface PostPageProps {
  params: Promise<{
    post_id: string;
  }>;
}

export default function PostPage({ params }: PostPageProps) {
  const { post_id } = React.use(params);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Knowledge Post</h1>
        <p className="text-muted-foreground mb-8">
          Post ID: {post_id}
        </p>

        {/* Post content will be implemented here */}
        <div className="space-y-6">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Post Title</h3>
            <p className="text-sm text-muted-foreground">
              Post title will be displayed here
            </p>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Post Content</h3>
            <p className="text-sm text-muted-foreground">
              Formatted post body content will be displayed here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
