import { Button } from "@/components/ui/button";

interface PaginationButtonsProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PaginationButtons({
  page,
  totalPages,
  onPageChange,
}: PaginationButtonsProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        className="rounded border px-3 py-1 text-sm disabled:opacity-50"
        variant="outline"
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
      >
        Previous
      </Button>
      {Array.from({ length: totalPages }).map((_, i) => (
        <Button
          key={i}
          variant={page === i + 1 ? "default" : "outline"}
          className="rounded border px-3 py-1 text-sm"
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </Button>
      ))}
      <Button
        className="rounded border px-3 py-1 text-sm disabled:opacity-50"
        variant="outline"
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
      >
        Next
      </Button>
    </div>
  );
}
