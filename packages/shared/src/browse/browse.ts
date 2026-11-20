import type { Band, Concert } from '../concert.ts'
import { isInChosenGenres, matchesQuery } from './filters.ts'
import { groupByBand } from './group-by-band.ts'
import type { BrowseQuery } from './query.ts'
import type { BrowseResult, EmptyReason } from './result.ts'

/**
 * The page's only source of browse behaviour: takes every concert and the visitor's
 * query, returns a render-ready result. Pure: no React, no browser APIs, no input
 * mutation.
 */
export function browse(concerts: readonly Concert[], query: BrowseQuery): BrowseResult {
  const shown = concerts.filter((concert) => matchesQuery(concert, query))
  return {
    grouping: 'band',
    bands: groupByBand(followedBands(concerts, query), shown),
    empty: emptyReason(concerts, query, shown),
  }
}

function emptyReason(
  concerts: readonly Concert[],
  query: BrowseQuery,
  shown: readonly Concert[],
): EmptyReason | null {
  if (!concerts.some((concert) => query.bandIds.includes(concert.band.id))) return 'no-bands'
  return shown.length === 0 ? 'filters-too-narrow' : null
}

/** The query's bands that appear in the data and pass the genre filter, in the visitor's order. */
function followedBands(concerts: readonly Concert[], query: BrowseQuery): Band[] {
  const known = new Map(concerts.map((concert) => [concert.band.id, concert.band]))
  return query.bandIds
    .flatMap((id) => known.get(id) ?? [])
    .filter((band) => isInChosenGenres(band, query))
}
