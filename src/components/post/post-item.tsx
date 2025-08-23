import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Heart } from "lucide-react";

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
      <div className="relative w-40 min-w-40 h-40 flex-shrink-0 bg-zinc-100 dark:bg-zinc-800">
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
      <div className="flex flex-col flex-1 p-4 justify-between">
        <div>
          <div className="text-xl font-semibold mb-2">{title}</div>
          <div
            className="text-sm text-muted-foreground line-clamp-3 mb-4"
            title={content}
          >
            {content}
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-4 text-muted-foreground">
            <span className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              <span className="text-sm">{likes}</span>
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
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
