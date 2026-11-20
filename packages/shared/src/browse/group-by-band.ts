import { bySoonest, type Band, type Concert } from '../concert.ts'
import { fansTag } from './fans-tag.ts'
import { hasNoDatesNear, isNear } from './near-me.ts'
import type { BrowseQuery } from './query.ts'
import { ticketNote } from './ticket-note.ts'
import type { BandGroup, DateEntry, TourSummary } from './result.ts'

/**
 * One group per band, in the given band order, each with its concerts in date order.
 * A band with no shown concerts gets no group: the page never shows an empty column.
 */
export function groupByBand(
  bands: readonly Band[],
  concerts: readonly Concert[],
  query: BrowseQuery,
): BandGroup[] {
  return bands.flatMap((band) => {
    const bandConcerts = concerts.filter((concert) => concert.band.id === band.id).sort(bySoonest)
    const first = bandConcerts[0]
    const last = bandConcerts.at(-1)
    if (first === undefined || last === undefined) return []
    const dates: DateEntry[] = bandConcerts.map((concert) => {
      const near = isNear(concert, query)
      return {
        concert,
        near,
        ticketNote: ticketNote(concert.tickets),
        fansTag: fansTag(concert.fans, near),
      }
    })
    const summary: TourSummary = {
      dateCount: dates.length,
      cityCount: new Set(bandConcerts.map((concert) => concert.venue.city.id)).size,
      span: { firstDate: first.date, lastDate: last.date },
    }
    return [{ band, summary, dates, noDatesNear: hasNoDatesNear(dates, query) }]
  })
}
