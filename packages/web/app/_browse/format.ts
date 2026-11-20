import type { TourSummary } from "@fanout/shared";

/*
 * Presentation-only formatting of browse results. Dates are `YYYY-MM-DD` calendar
 * dates, formatted in UTC so server and browser agree on the day.
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

const utc = (isoDate: string) => new Date(`${isoDate}T00:00:00Z`);

/** Short parts for a date row, e.g. `{ day: "Fri 4", month: "Dec" }`. */
export function dateParts(isoDate: string): { day: string; month: string } {
  const date = utc(isoDate);
  return { day: weekdayDay.format(date), month: month.format(date) };
}

/** Unambiguous date for screen readers and `<time>` titles. */
export function fullDate(isoDate: string): string {
  return full.format(utc(isoDate));
}

/** e.g. "12 dates · 7 cities · 3 Dec – 14 Apr". */
export function tourSummaryLine(summary: TourSummary): string {
  const { dateCount, cityCount, firstDate, lastDate } = summary;
  if (dateCount === 0 || firstDate === null || lastDate === null) return "No upcoming dates";
  const parts = [plural(dateCount, "date"), plural(cityCount, "city", "cities")];
  parts.push(
    firstDate === lastDate
      ? dayMonth.format(utc(firstDate))
      : `${dayMonth.format(utc(firstDate))} – ${dayMonth.format(utc(lastDate))}`,
  );
  return parts.join(" · ");
}

function plural(count: number, one: string, many = `${one}s`): string {
  return `${count} ${count === 1 ? one : many}`;
}
