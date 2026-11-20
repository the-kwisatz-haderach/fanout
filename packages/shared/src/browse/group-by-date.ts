import type { IsoDate } from '../iso-date.ts'
import type { BandGroup, DateEntry, DayGroup } from './result.ts'

/**
 * Regroups by-band groups under day headings, in date order. Within a day, dates keep
 * the band order of the groups, so by-band ranking carries over to by-date.
 */
export function groupByDate(bands: readonly BandGroup[]): DayGroup[] {
  const days = new Map<IsoDate, DateEntry[]>()
  for (const group of bands) {
    for (const entry of group.dates) {
      const day = days.get(entry.concert.date)
      if (day) day.push(entry)
      else days.set(entry.concert.date, [entry])
    }
  }
  return [...days.keys()].sort().map((date) => ({ date, dates: days.get(date) ?? [] }))
}
