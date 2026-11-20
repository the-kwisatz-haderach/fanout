import type { Concert } from "@fanout/shared";
import { dateParts, fullDate } from "./format";

/** What a date row leads with: its date (by band) or its band (by date). */
export type RowLeadKind = "date" | "band";

export function RowLead({ kind, concert }: { kind: RowLeadKind; concert: Concert }) {
  if (kind === "band") {
    return (
      <span className="min-w-0 font-display text-xl leading-none font-extrabold break-words uppercase">
        {concert.band.name}
      </span>
    );
  }

  const { day, month } = dateParts(concert.date);
  return (
    <time
      dateTime={concert.date}
      title={fullDate(concert.date)}
      className="font-display text-2xl leading-none font-extrabold whitespace-nowrap uppercase"
    >
      {day} {month}
    </time>
  );
}
