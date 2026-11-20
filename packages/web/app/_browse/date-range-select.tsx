"use client";

import { DATE_RANGES, type DateRangeId } from "@fanout/shared";
import { useBrowseQuery } from "./use-browse-query";

/** The window of upcoming dates to show. */
export function DateRangeSelect({ className }: { className: string }) {
  const { query, setDateRangeId } = useBrowseQuery();

  return (
    <label className="flex items-center gap-2">
      <span className="sr-only">Date range</span>
      <select
        name="range"
        value={query.dateRangeId}
        onChange={(event) => setDateRangeId(event.target.value as DateRangeId)}
        className={className}
      >
        {DATE_RANGES.map((range) => (
          <option key={range.id} value={range.id}>
            {range.label}
          </option>
        ))}
      </select>
    </label>
  );
}
