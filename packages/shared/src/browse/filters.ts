import type { Band, Concert } from '../concert.ts'
import type { BrowseQuery } from './query.ts'

/** Decides whether one concert is shown for a query. */
export type ConcertFilter = (concert: Concert, query: BrowseQuery) => boolean

const isFollowedBand: ConcertFilter = (concert, query) =>
  query.bandIds.includes(concert.band.id)

/** Whether a band plays any of the chosen genres. No chosen genres means every band. */
export function isInChosenGenres(band: Band, query: BrowseQuery): boolean {
  return (
    query.genreIds.length === 0 || band.genres.some((genre) => query.genreIds.includes(genre.id))
  )
}

const isInGenres: ConcertFilter = (concert, query) => isInChosenGenres(concert.band, query)

/** Every filter a concert must pass to be shown. Add one entry per filter. */
const FILTERS: readonly ConcertFilter[] = [isFollowedBand, isInGenres]

export function matchesQuery(concert: Concert, query: BrowseQuery): boolean {
  return FILTERS.every((filter) => filter(concert, query))
}
