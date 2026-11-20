import Link from "next/link";
import type { DateEntry } from "@fanout/shared";
import { FansTag } from "./fans-tag";
import { MarkToggle } from "./mark-toggle";
import { nearLeadClass, NearYouLabel } from "./near-you";
import { RowLead, type RowLeadKind } from "./row-lead";
import { TicketNoteLabel, ticketNoteClass } from "./ticket-note";

/**
 * One tour date: date (or band, when grouped by date), city and, when near you, venue,
 * linking to its concert, with a toggle to mark the show. `data-date` lets the sticky
 * bar track which dates are in view.
 */
export function DateRow({ entry, lead = "date" }: { entry: DateEntry; lead?: RowLeadKind }) {
  const { concert } = entry;

  return (
    <li data-date={concert.date} className="flex items-start gap-2">
      <Link
        href={`/concerts/${concert.id}`}
        prefetch={false}
        className="group grid min-w-0 flex-1 grid-cols-[7rem_1fr] items-baseline gap-x-3 py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-process"
      >
        <RowLead
          kind={lead}
          concert={concert}
          className={`${nearLeadClass(entry.near)} ${ticketNoteClass(entry.ticketNote)}`}
        />
        <TicketNoteLabel note={entry.ticketNote} />
        <span className={`min-w-0 break-words ${entry.near ? "" : "text-bone/60"}`}>
          <span className="block font-semibold uppercase tracking-wide group-hover:underline">
            {concert.venue.city.name}
          </span>
          {entry.near && (
            <>
              <span className="block text-sm text-bone/70">{concert.venue.name}</span>
              <NearYouLabel />
              <FansTag tag={entry.fansTag} />
            </>
          )}
        </span>
      </Link>
      <MarkToggle concert={concert} />
    </li>
  );
}
