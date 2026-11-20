import type { Band, Concert } from '../concert.ts'
import { fansTag } from './fans-tag.ts'
import { hasNoDatesNear, isNear } from './near-me.ts'
import type { BrowseQuery } from './query.ts'
import { ticketNote } from './ticket-note.ts'
import type { BandGroup, DateEntry, TourSummary } from './result.ts'

/**
 * One group per band, in the given band order, each with its concerts in date order.
 * Bands with no concerts get an empty group.
 */
export function groupByBand(
  bands: readonly Band[],
  concerts: readonly Concert[],
  query: BrowseQuery,
): BandGroup[] {
  return bands.map((band) => {
    const dates: DateEntry[] = concerts
      .filter((concert) => concert.band.id === band.id)
      .sort(byDate)
      .map((concert) => {
        const near = isNear(concert, query)
        return {
          concert,
          near,
          ticketNote: ticketNote(concert.tickets),
          fansTag: fansTag(concert.fans, near),
        }
      })
    return { band, summary: summarise(dates), dates, noDatesNear: hasNoDatesNear(dates, query) }
  })
}

function byDate(a: Concert, b: Concert): number {
  return a.date < b.date ? -1 : a.date > b.date ? 1 : a.id < b.id ? -1 : 1
}

function summarise(dates: readonly DateEntry[]): TourSummary {
  return {
    dateCount: dates.length,
    cityCount: new Set(dates.map((d) => d.concert.venue.city.id)).size,
    firstDate: dates[0]?.concert.date ?? null,
    lastDate: dates.at(-1)?.concert.date ?? null,
  }
}
