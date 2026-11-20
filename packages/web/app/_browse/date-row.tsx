import Link from "next/link";
import type { DateEntry } from "@fanout/shared";
import { dateParts, fullDate } from "./format";
import { nearDateClass, NearYouLabel } from "./near-you";

/** One tour date: date and city, plus the venue when near you, linking to its concert. */
export function DateRow({ entry }: { entry: DateEntry }) {
  const { concert } = entry;
  const { day, month } = dateParts(concert.date);

  return (
    <li>
      <Link
        href={`/concerts/${concert.id}`}
        prefetch={false}
        className="group grid grid-cols-[7rem_1fr] items-baseline gap-x-3 py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-process"
      >
        <time
          dateTime={concert.date}
          title={fullDate(concert.date)}
          className={`font-display leading-none font-extrabold whitespace-nowrap uppercase ${nearDateClass(entry.near)}`}
        >
          {day} {month}
        </time>
        <span className={`min-w-0 break-words ${entry.near ? "" : "text-bone/60"}`}>
          <span className="block font-semibold uppercase tracking-wide group-hover:underline">
            {concert.venue.city.name}
          </span>
          {entry.near && (
            <>
              <span className="block text-sm text-bone/70">{concert.venue.name}</span>
              <NearYouLabel />
            </>
          )}
        </span>
      </Link>
    </li>
  );
}
