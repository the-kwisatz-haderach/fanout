import { plural, type DateSpan, type IsoDate, type TourSummary } from "@fanout/shared";

/*
 * Presentation-only formatting of browse results. Dates are calendar dates
 * (`IsoDate`), formatted in UTC so server and browser agree on the day.
 */

const weekdayDay = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  timeZone: "UTC",
});
const month = new Intl.DateTimeFormat("en-GB", { month: "short", timeZone: "UTC" });
const dayMonth = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  timeZone: "UTC",
});
const full = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

const utc = (isoDate: IsoDate) => new Date(`${isoDate}T00:00:00Z`);

/** Short parts for a date row, e.g. `{ day: "Fri 4", month: "Dec" }`. */
export function dateParts(isoDate: IsoDate): { day: string; month: string } {
  const date = utc(isoDate);
  return { day: weekdayDay.format(date), month: month.format(date) };
}

/** Unambiguous date for screen readers and `<time>` titles. */
export function fullDate(isoDate: IsoDate): string {
  return full.format(utc(isoDate));
}

/** e.g. "12 dates · 7 cities · 3 Dec – 14 Apr". */
export function tourSummaryLine({ dateCount, cityCount, span }: TourSummary): string {
  return [plural(dateCount, "date"), plural(cityCount, "city", "cities"), dateSpanLabel(span)].join(
    " · ",
  );
}

/** e.g. "28 Nov – 15 Dec", or "28 Nov" for a single day. */
export function dateSpanLabel(span: DateSpan): string {
  const first = dayMonth.format(utc(span.firstDate));
  return span.firstDate === span.lastDate
    ? first
    : `${first} – ${dayMonth.format(utc(span.lastDate))}`;
}

/** Day heading for by-date results, e.g. "Fri 4 Dec". */
export function dayHeading(isoDate: IsoDate): string {
  const { day, month } = dateParts(isoDate);
  return `${day} ${month}`;
}
