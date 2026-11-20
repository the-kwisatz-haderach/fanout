import type { ReactNode } from "react";
import type { DateSpan } from "@fanout/shared";
import { dateSpanLabel } from "./format";

/**
 * Sticky bar above the results: the date range currently in view, plus the results'
 * controls (`children`).
 */
export function DateRangeBar({
  span,
  children,
}: {
  /** `null` when no dates are shown; `undefined` while results load. */
  span: DateSpan | null | undefined;
  children?: ReactNode;
}) {
  return (
    <div className="sticky top-0 z-10 -mx-4 mb-6 flex min-h-16 flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-bone/20 bg-ink px-4 py-2 md:-mx-6 md:px-6">
      {span === undefined ? (
        <div aria-hidden className="h-6 w-40 animate-pulse bg-bone/10 motion-reduce:animate-none" />
      ) : (
        <p className="font-display text-2xl leading-none font-extrabold uppercase">
          <span className="sr-only">Dates in view: </span>
          {span ? dateSpanLabel(span) : "No dates"}
        </p>
      )}
      {children}
    </div>
  );
}
