import type { Concert } from '../concert.ts'
import { DATE_RANGES } from '../date-range.ts'
import type { BrowseContext, BrowseQuery } from './query.ts'

/** Decides whether one concert is shown for a query. */
export type ConcertFilter = (
  concert: Concert,
  query: BrowseQuery,
  context: BrowseContext,
) => boolean

const isFollowedBand: ConcertFilter = (concert, query) =>
  query.bandIds.includes(concert.band.id)

/** Upcoming dates in the chosen window: from today, for the range's number of days. */
const isInDateRange: ConcertFilter = (concert, query, { today }) => {
  const range = DATE_RANGES.find((r) => r.id === query.dateRangeId)
  return concert.date >= today && (range === undefined || concert.date < addDays(today, range.days))
}

/** Every filter a concert must pass to be shown. Add one entry per filter. */
const FILTERS: readonly ConcertFilter[] = [isFollowedBand, isInDateRange]

export function matchesQuery(
  concert: Concert,
  query: BrowseQuery,
  context: BrowseContext,
): boolean {
  return FILTERS.every((filter) => filter(concert, query, context))
}

function addDays(isoDate: string, days: number): string {
  const date = new Date(`${isoDate}T00:00:00Z`)
  date.setUTCDate(date.getUTCDate() + days)
  return date.toISOString().slice(0, 10)
}
