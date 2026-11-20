/**
 * A calendar date as `YYYY-MM-DD`, with no time or zone. Sorts and compares as a
 * string, so `<`, `>` and `.sort()` order dates correctly.
 */
export type IsoDate = string

/** An inclusive range of calendar dates. */
export interface DateSpan {
  firstDate: IsoDate
  lastDate: IsoDate
}

/** The earliest and latest of some dates, in any order; `null` when there are none. */
export function dateSpan(dates: Iterable<IsoDate>): DateSpan | null {
  const sorted = [...dates].sort()
  const firstDate = sorted[0]
  const lastDate = sorted.at(-1)
  return firstDate !== undefined && lastDate !== undefined ? { firstDate, lastDate } : null
}

/** The date `days` later (or earlier, when negative), counted in UTC. */
export function addDays(date: IsoDate, days: number): IsoDate {
  const utc = new Date(`${date}T00:00:00Z`)
  utc.setUTCDate(utc.getUTCDate() + days)
  return utc.toISOString().slice(0, 10)
}
