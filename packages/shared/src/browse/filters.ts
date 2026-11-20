import type { Band, Concert } from '../concert.ts'
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

/** Whether a band plays any of the chosen genres. No chosen genres means every band. */
export function isInChosenGenres(band: Band, query: BrowseQuery): boolean {
  return (
    query.genreIds.length === 0 || band.genres.some((genre) => query.genreIds.includes(genre.id))
  )
}

const isInGenres: ConcertFilter = (concert, query) => isInChosenGenres(concert.band, query)

/** Upcoming dates in the chosen window: from today, for the range's number of days. */
const isInDateRange: ConcertFilter = (concert, query, { today }) => {
  const range = DATE_RANGES.find((r) => r.id === query.dateRangeId)
  return concert.date >= today && (range === undefined || concert.date < addDays(today, range.days))
}

/** With "only shows with fans like me" on, dates where a going fan shares your bands. */
const hasFansLikeMe: ConcertFilter = (concert, query) =>
  !query.fansLikeMeOnly || concert.fans.sharesYourBands > 0

/** At the chosen venue; no chosen venue means every venue. */
const isAtVenue: ConcertFilter = (concert, query) =>
  query.venueId === null || concert.venue.id === query.venueId

/** Every filter a concert must pass to be shown. Add one entry per filter. */
const FILTERS: readonly ConcertFilter[] = [
  isFollowedBand,
  isInGenres,
  isInDateRange,
  hasFansLikeMe,
  isAtVenue,
]

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
