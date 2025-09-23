import { Search } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Input } from "./input";

interface CollapsibleSearchProps {
  placeholder?: string;
  onChange?: (value: string) => void;
  value?: string;
}

export function CollapsibleSearch({
  placeholder = "Tìm kiếm...",
  onChange,
  value,
}: CollapsibleSearchProps) {
  const [expanded, setExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleExpand = () => {
    setExpanded(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 150); // Wait for animation
  };

  const handleBlur = () => {
    if (!value) {
      setExpanded(false);
    }
  };

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div
      className={cn(
        "border-input bg-background flex items-center overflow-hidden rounded-full border shadow-sm transition-all duration-300 ease-in-out",
        expanded ? "w-64 px-3" : "w-10 px-0",
      )}
      style={{
        minHeight: 40,
        cursor: expanded ? "auto" : "pointer",
      }}
      onClick={() => {
        if (!expanded) handleExpand();
      }}
    >
      <Button
        type="button"
        tabIndex={-1}
        className="flex items-center justify-center p-2"
        aria-label="Search"
        style={{
          pointerEvents: expanded ? "none" : "auto",
        }}
      >
        <Search size={20} className="text-muted-foreground" />
      </Button>
      <Input
        ref={inputRef}
        type="text"
        className={cn(
          "flex-1 border-0 bg-transparent text-sm transition-all duration-300 outline-none",
          expanded
            ? "ml-2 w-full opacity-100"
            : "pointer-events-none ml-0 w-0 opacity-0",
        )}
        placeholder={expanded ? placeholder : ""}
        value={value}
        onChange={handleChangeValue}
        onBlur={handleBlur}
        tabIndex={expanded ? 0 : -1}
      />
    </div>
  );
}
