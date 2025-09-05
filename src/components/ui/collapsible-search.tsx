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
        "flex items-center transition-all duration-300 ease-in-out border border-input bg-background rounded-full overflow-hidden shadow-sm",
        expanded ? "w-64 px-3" : "w-10 px-0"
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
          "bg-transparent outline-none border-0 flex-1 transition-all duration-300 text-sm",
          expanded
            ? "opacity-100 ml-2 w-full"
            : "opacity-0 ml-0 w-0 pointer-events-none"
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
