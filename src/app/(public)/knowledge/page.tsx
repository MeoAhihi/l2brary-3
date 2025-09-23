import { Metadata } from "next";
import { PostList } from "@/components/post/post-list";
import posts from "@/constants/posts.json";
export const metadata: Metadata = {
  title: "Knowledge Hub | L2brary",
  description: "Browse and discover knowledge posts from the community",
};

export default function KnowledgePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-3xl font-bold">Knowledge Hub</h1>
        <p className="text-muted-foreground mb-8">
          Discover insights and knowledge shared by the community
        </p>

        <PostList posts={posts} pageSize={5} />
      </div>
    </div>
  );
}
