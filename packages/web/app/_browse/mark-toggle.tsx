"use client";

import type { Concert } from "@fanout/shared";
import { fullDate } from "./format";
import { useMarkedShow } from "./use-marked-shows";

/**
 * Toggle to mark a show for the visitor's shortlist. The visible word stays "Mark" so
 * the accessible name contains it; marked is shown by reversed type and a tick, and
 * announced through `aria-pressed`.
 */
export function MarkToggle({ concert }: { concert: Concert }) {
  const { marked, toggle } = useMarkedShow(concert.id);

  return (
    <button
      type="button"
      aria-pressed={marked}
      aria-label={`Mark ${concert.band.name}, ${fullDate(concert.date)}`}
      onClick={toggle}
      className={`mt-2 flex shrink-0 items-center gap-1 border border-bone px-1.5 py-0.5 text-xs font-semibold tracking-widest uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-process ${
        marked ? "bg-bone text-ink" : "text-bone/80 hover:text-bone"
      }`}
    >
      <span aria-hidden className="w-2.5 text-center">
        {marked ? "✓" : "+"}
      </span>
      Mark
    </button>
  );
}
