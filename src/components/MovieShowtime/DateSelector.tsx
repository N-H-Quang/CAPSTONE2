import React from "react";

export interface DateItem {
  label: string;
  weekday: string;
}

interface DateSelectorProps {
  fullDateRange: DateItem[];
  windowStart: number;
  visibleDays: number;
  selectedDateIndex: number;
  setWindowStart: (v: number | ((prev: number) => number)) => void;
  setSelectedDateIndex: (i: number) => void;
}

export default function DateSelector({
  fullDateRange,
  windowStart,
  visibleDays,
  selectedDateIndex,
  setWindowStart,
  setSelectedDateIndex,
}: DateSelectorProps) {
  const displayedDates = fullDateRange.slice(windowStart, windowStart + visibleDays);

  return (
    <div className="flex items-center justify-between gap-2 sm:gap-3 mb-4">
      <button
        onClick={() => setWindowStart((s: number) => Math.max(0, s - 1))}
        disabled={windowStart === 0}
        className="p-1.5 sm:p-2 rounded-md bg-white border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition-colors shrink-0"
      >
        ‹
      </button>

      <div className="flex gap-1.5 justify-center sm:gap-2 md:gap-3 items-center overflow-x-auto flex-1 hide-scrollbar">
        {displayedDates.map((d, localIdx) => {
          const globalIdx = windowStart + localIdx;
          return (
            <button
              key={`${d.label}-${globalIdx}`}
              onClick={() => setSelectedDateIndex(globalIdx)}
              className={`flex flex-col items-center px-2 py-1.5 sm:px-3 sm:py-2 rounded-md text-xs sm:text-sm transition-colors shrink-0 ${
                globalIdx === selectedDateIndex 
                  ? "bg-black text-white" 
                  : "bg-white text-black/80 hover:bg-gray-50"
              }`}
            >
              <span className="font-semibold whitespace-nowrap">{d.label}</span>
              <span className="text-[10px] sm:text-xs">{d.weekday}</span>
            </button>
          );
        })}
      </div>

      <button
        onClick={() => setWindowStart((s: number) => Math.min(s + 1, fullDateRange.length - visibleDays))}
        disabled={windowStart + visibleDays >= fullDateRange.length}
        className="p-1.5 sm:p-2 rounded-md bg-white border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition-colors shrink-0"
      >
        ›
      </button>
    </div>
  );
}
