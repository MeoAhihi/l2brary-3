"use client"
import { PostItem } from "./post-item";
import { useState, useMemo } from "react";
import type { PostCardProps } from "./post-item";
import { PaginationButtons } from "../ui/pagination-buttons";

type PostListProps = {
  posts: PostCardProps[];
  pageSize?: number;
};

export function PostList({ posts, pageSize = 5 }: PostListProps) {
  const [page, setPage] = useState(1);

  // Pagination
  const totalPages = Math.ceil(posts.length / pageSize);
  const paginatedPosts = useMemo(() => {
    const start = (page - 1) * pageSize;
    return posts.slice(start, start + pageSize);
  }, [page, pageSize]);

  return (
    <div className="flex flex-col gap-6">
      {/* Posts */}
      {paginatedPosts.length === 0 ? (
        <div className="text-muted-foreground text-center py-8">No posts found.</div>
      ) : (
        paginatedPosts.map((post, idx) => (
          <PostItem
            key={post.postUrl || idx}
            thumbnail={post.thumbnail}
            title={post.title}
            content={post.content}
            likes={post.likes}
            commentsCount={post.commentsCount}
            postUrl={post.postUrl}
          />
        ))
      )}

      {/* Pagination controls */}
      {totalPages > 1 && (
        <PaginationButtons
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}

