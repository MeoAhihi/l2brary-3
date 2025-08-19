"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Pagination({
  total,
  page,
  limit,
}: {
  total: number;
  page: number;
  limit: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const totalPages = Math.ceil(total / limit);

  function goToPage(p: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(p));
    router.push(`?${params.toString()}`);
  }

  if (totalPages <= 1) return null;

  return (
    <div className="flex gap-2 justify-center">
      <Button
        variant="outline"
        size="sm"
        disabled={page === 1}
        onClick={() => goToPage(page - 1)}
      >
        Prev
      </Button>

      {Array.from({ length: totalPages }, (_, i) => (
        <Button
          key={i}
          variant={page === i + 1 ? "default" : "outline"}
          size="sm"
          onClick={() => goToPage(i + 1)}
          className={cn(page === i + 1 && "pointer-events-none")}
        >
          {i + 1}
        </Button>
      ))}

      <Button
        variant="outline"
        size="sm"
        disabled={page === totalPages}
        onClick={() => goToPage(page + 1)}
      >
        Next
      </Button>
    </div>
  );
}
