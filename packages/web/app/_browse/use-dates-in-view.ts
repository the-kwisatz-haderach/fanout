"use client";

import { useEffect, useState, type RefObject } from "react";
import type { DateSpan } from "@fanout/shared";

/** Space the sticky date-range bar covers at the top of the viewport. */
const STICKY_BAR_MARGIN = "-4rem 0px 0px 0px";

/**
 * The first and last date among the date rows (`[data-date]`) currently on screen
 * inside `container`, or `null` before anything is measured or when none is visible.
 * Re-observes whenever `result` changes.
 */
export function useDatesInView(
  container: RefObject<HTMLElement | null>,
  result: unknown,
): DateSpan | null {
  const [span, setSpan] = useState<DateSpan | null>(null);

  useEffect(() => {
    const root = container.current;
    if (!root) return;
    const visible = new Set<HTMLElement>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const row = entry.target as HTMLElement;
          if (entry.isIntersecting) visible.add(row);
          else visible.delete(row);
        }
        const dates = [...visible].flatMap((row) => row.dataset.date ?? []).sort();
        const firstDate = dates[0];
        const lastDate = dates.at(-1);
        setSpan(firstDate && lastDate ? { firstDate, lastDate } : null);
      },
      { rootMargin: STICKY_BAR_MARGIN },
    );

    root.querySelectorAll<HTMLElement>("[data-date]").forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, [container, result]);

  return span;
}
