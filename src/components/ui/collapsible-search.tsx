import { Search } from "lucide-react";
import { useRef, useState } from "react";

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

  return (
    <div
      className={`flex items-center transition-all duration-300 ease-in-out border border-input bg-background rounded-full overflow-hidden shadow-sm ${expanded ? "w-64 px-3" : "w-10 px-0"
        }`}
      style={{
        minHeight: 40,
        cursor: expanded ? "auto" : "pointer",
      }}
      onClick={() => {
        if (!expanded) handleExpand();
      }}
    >
      <button
        type="button"
        tabIndex={-1}
        className="flex items-center justify-center p-2"
        aria-label="Search"
        style={{
          pointerEvents: expanded ? "none" : "auto",
        }}
      >
        <Search size={20} className="text-muted-foreground" />
      </button>
      <input
        ref={inputRef}
        type="text"
        className={`bg-transparent outline-none border-none flex-1 transition-all duration-300 text-sm ${expanded ? "opacity-100 ml-2" : "opacity-0 w-0 ml-0"
          }`}
        placeholder={expanded ? placeholder : ""}
        value={value}
        onChange={e => onChange?.(e.target.value)}
        onBlur={handleBlur}
        tabIndex={expanded ? 0 : -1}
        style={{
          minWidth: expanded ? 0 : 0,
        }}
      />
    </div>
  );
}
