import { Heart, MessageCircle } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

export type PostCardProps = {
  thumbnail: string;
  title: string;
  content: string;
  likes: number;
  commentsCount: number;
  postUrl: string;
};

export function PostItem({
  thumbnail,
  title,
  content,
  likes,
  commentsCount,
  postUrl,
}: PostCardProps) {
  return (
    <div className="flex">
      {/* Image on the left */}
      <div className="relative h-40 w-40 min-w-40 flex-shrink-0 bg-zinc-100 dark:bg-zinc-800">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover"
          sizes="160px"
          priority
        />
      </div>
      {/* Content on the right */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <div className="mb-2 text-xl font-semibold">{title}</div>
          <div
            className="text-muted-foreground mb-4 line-clamp-3 text-sm"
            title={content}
          >
            {content}
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-muted-foreground flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              <span className="text-sm">{likes}</span>
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm">{commentsCount}</span>
            </span>
          </div>
          <Button asChild size="sm" variant="default">
            <a href={postUrl}>Read Post</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
