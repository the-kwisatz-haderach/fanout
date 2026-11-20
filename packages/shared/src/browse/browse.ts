import type { Band, Concert } from '../concert.ts'
import { matchesQuery } from './filters.ts'
import { groupByBand } from './group-by-band.ts'
import { keepNearMe } from './near-me.ts'
import type { BrowseContext, BrowseQuery } from './query.ts'
import type { BrowseResult } from './result.ts'

/**
 * The page's only source of browse behaviour: takes every concert and the visitor's
 * query, returns a render-ready result. Pure: no React, no browser APIs, no input
 * mutation.
 */
export function browse(
  concerts: readonly Concert[],
  query: BrowseQuery,
  context: BrowseContext,
): BrowseResult {
  const inView = concerts.filter((concert) => matchesQuery(concert, query, context))
  const shown = keepNearMe(inView, query)
  return { grouping: 'band', bands: groupByBand(followedBands(concerts, query), shown, query) }
}

/** The query's bands that appear in the data, in the visitor's order. */
function followedBands(concerts: readonly Concert[], query: BrowseQuery): Band[] {
  const known = new Map(concerts.map((concert) => [concert.band.id, concert.band]))
  return query.bandIds.flatMap((id) => known.get(id) ?? [])
}
