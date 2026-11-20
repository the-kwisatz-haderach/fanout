import type { Concert } from '../concert.ts'
import type { BrowseQuery } from './query.ts'

/** Decides whether one concert is shown for a query. */
export type ConcertFilter = (concert: Concert, query: BrowseQuery) => boolean

const isFollowedBand: ConcertFilter = (concert, query) =>
  query.bandIds.includes(concert.band.id)

/** Every filter a concert must pass to be shown. Add one entry per filter. */
const FILTERS: readonly ConcertFilter[] = [isFollowedBand]

export function matchesQuery(concert: Concert, query: BrowseQuery): boolean {
  return FILTERS.every((filter) => filter(concert, query))
}
