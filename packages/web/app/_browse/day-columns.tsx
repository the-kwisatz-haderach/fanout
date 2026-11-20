import type { DayGroup } from "@fanout/shared";
import { ColumnGrid } from "./column-grid";
import { DateRow } from "./date-row";
import { dayHeading, fullDate } from "./format";

/** Top-rule inks, cycled per column in page order (as band columns). */
const RULES = ["border-bone", "border-pink", "border-process"] as const;

/** The by-date result: one column per day, in the order the browse module gives. */
export function DayColumns({ days }: { days: readonly DayGroup[] }) {
  return (
    <ColumnGrid>
      {days.map((day, index) => {
        const headingId = `day-${day.date}`;
        return (
          <section
            key={day.date}
            aria-labelledby={headingId}
            className={`min-w-0 border-t-4 pt-3 ${RULES[index % RULES.length]}`}
          >
            <h2
              id={headingId}
              className="font-display text-4xl leading-[0.95] font-extrabold uppercase"
            >
              <time dateTime={day.date} title={fullDate(day.date)}>
                {dayHeading(day.date)}
              </time>
            </h2>
            <ol className="mt-3 divide-y divide-bone/15">
              {day.dates.map((entry) => (
                <DateRow key={entry.concert.id} entry={entry} lead="band" />
              ))}
            </ol>
          </section>
        );
      })}
    </ColumnGrid>
  );
}
