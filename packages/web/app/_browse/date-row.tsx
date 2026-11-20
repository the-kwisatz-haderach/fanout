import Link from "next/link";
import type { DateEntry } from "@fanout/shared";
import { RowLead, type RowLeadKind } from "./row-lead";

/**
 * One tour date: date (or band, when grouped by date), city and venue, linking to its
 * concert. `data-date` lets the sticky bar track which dates are in view.
 */
export function DateRow({ entry, lead = "date" }: { entry: DateEntry; lead?: RowLeadKind }) {
  const { concert } = entry;

  return (
    <li data-date={concert.date}>
      <Link
        href={`/concerts/${concert.id}`}
        prefetch={false}
        className="group grid grid-cols-[7rem_1fr] items-baseline gap-x-3 py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-process"
      >
        <RowLead kind={lead} concert={concert} />
        <span className="min-w-0 break-words">
          <span className="block font-semibold uppercase tracking-wide group-hover:underline">
            {concert.venue.city.name}
          </span>
          <span className="block text-sm text-bone/70">{concert.venue.name}</span>
        </span>
      </Link>
    </li>
  );
}
