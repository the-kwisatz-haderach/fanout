import type { BandGroup } from "@fanout/shared";
import { DateRow } from "./date-row";
import { NoDatesNear } from "./near-you";
import { tourSummaryLine } from "./format";

/** Top-rule inks, cycled per column in page order. */
const RULES = ["border-bone", "border-pink", "border-process"] as const;

/** One band's run of dates, like a column on the back of a tour shirt. */
export function BandColumn({
  group,
  index,
  cityName,
}: {
  group: BandGroup;
  index: number;
  cityName: string | null;
}) {
  const headingId = `band-${group.band.id}`;

  return (
    <section
      aria-labelledby={headingId}
      className={`min-w-0 border-t-4 pt-3 ${RULES[index % RULES.length]}`}
    >
      <h2
        id={headingId}
        className="font-display text-4xl leading-[0.95] font-extrabold break-words uppercase"
      >
        {group.band.name}
      </h2>
      <p className="mt-2 text-sm font-semibold tracking-wide text-bone/70 uppercase">
        {tourSummaryLine(group.summary)}
      </p>
      {group.noDatesNear && cityName !== null && <NoDatesNear cityName={cityName} />}
      <ol className="mt-3 divide-y divide-bone/15">
        {group.dates.map((entry) => (
          <DateRow key={entry.concert.id} entry={entry} />
        ))}
      </ol>
    </section>
  );
}
