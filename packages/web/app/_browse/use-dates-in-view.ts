"use client";

import { useEffect, useState, type RefObject } from "react";
import { dateSpan, type DateSpan } from "@fanout/shared";

/** Space the sticky date-range bar covers at the top of the viewport (4rem; rootMargin only takes px or %). */
const STICKY_BAR_MARGIN = "-64px 0px 0px 0px";

/**
 * The first and last date among the date rows (`[data-date]`) currently on screen
 * inside `container`, or `null` before anything is measured or when none is visible.
 * Re-observes the rows whenever `remeasureWhen` changes (pass the rendered result).
 */
export function useDatesInView(
  container: RefObject<HTMLElement | null>,
  remeasureWhen: unknown,
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
        setSpan(dateSpan([...visible].flatMap((row) => row.dataset.date ?? [])));
      },
      { rootMargin: STICKY_BAR_MARGIN },
    );

    root.querySelectorAll<HTMLElement>("[data-date]").forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, [container, remeasureWhen]);

  return span;
}
