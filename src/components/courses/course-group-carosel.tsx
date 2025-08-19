"use client"

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CourseGroup from "./course-group";

type CourseGroup = {
  id: string;
  name: string;
  courses: number;
};

export default function CourseGroupCarousel({
  groups,
}: {
  groups: CourseGroup[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollIndex, setScrollIndex] = useState(0);

  // Show arrows only if more than 4 groups (arbitrary threshold for "short")
  const showArrows = groups.length > 4;

  const scrollBy = 4; // number of items to scroll per click

  function handlePrev() {
    if (!containerRef.current) return;
    const newIndex = Math.max(scrollIndex - scrollBy, 0);
    setScrollIndex(newIndex);
    const itemWidth = containerRef.current.firstElementChild
      ? (containerRef.current.firstElementChild as HTMLElement).offsetWidth
      : 0;
    containerRef.current.scrollTo({
      left: newIndex * itemWidth,
      behavior: "smooth",
    });
  }

  function handleNext() {
    if (!containerRef.current) return;
    const maxIndex = Math.max(groups.length - scrollBy, 0);
    const newIndex = Math.min(scrollIndex + scrollBy, maxIndex);
    setScrollIndex(newIndex);
    const itemWidth = containerRef.current.firstElementChild
      ? (containerRef.current.firstElementChild as HTMLElement).offsetWidth
      : 0;
    containerRef.current.scrollTo({
      left: newIndex * itemWidth,
      behavior: "smooth",
    });
  }

  return (
    <div className="relative w-full mb-6">
      {showArrows && (
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full shadow p-1 disabled:opacity-50"
          onClick={handlePrev}
          disabled={scrollIndex === 0}
          aria-label="Previous"
        >
          <ChevronLeft size={20} />
        </button>
      )}
      <div
        ref={containerRef}
        className="flex overflow-x-auto no-scrollbar gap-4 px-8"
        style={{ scrollBehavior: "smooth" }}
      >
        {groups.map((group) => (
          <CourseGroup group={group} key={group.id} />
        ))}
      </div>
      {showArrows && (
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full shadow p-1 disabled:opacity-50"
          onClick={handleNext}
          disabled={scrollIndex >= groups.length - scrollBy}
          aria-label="Next"
        >
          <ChevronRight size={20} />
        </button>
      )}
    </div>
  );
}

