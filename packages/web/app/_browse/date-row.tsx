import Link from "next/link";
import type { DateEntry } from "@fanout/shared";
import { dateParts, fullDate } from "./format";

/** One tour date: date, city and venue, linking to its concert. */
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
          className="font-display text-2xl leading-none font-extrabold whitespace-nowrap uppercase"
        >
          {day} {month}
        </time>
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
