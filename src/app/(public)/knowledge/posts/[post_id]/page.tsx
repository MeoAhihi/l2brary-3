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
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-3xl font-bold">Knowledge Post</h1>
        <p className="text-muted-foreground mb-8">Post ID: {post_id}</p>

        {/* Post content will be implemented here */}
        <div className="space-y-6">
          <div className="rounded-lg border p-6">
            <h3 className="mb-2 font-semibold">Post Title</h3>
            <p className="text-muted-foreground text-sm">
              Post title will be displayed here
            </p>
          </div>

          <div className="rounded-lg border p-6">
            <h3 className="mb-2 font-semibold">Post Content</h3>
            <p className="text-muted-foreground text-sm">
              Formatted post body content will be displayed here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
