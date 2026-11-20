import type { Band, Concert } from '../concert.ts'
import { matchesQuery } from './filters.ts'
import { groupByBand } from './group-by-band.ts'
import { popularBands } from './popular-bands.ts'
import type { BrowseQuery } from './query.ts'
import type { BandSource, BrowseResult } from './result.ts'

/**
 * The page's only source of browse behaviour: takes every concert and the visitor's
 * query, returns a render-ready result. Pure: no React, no browser APIs, no input
 * mutation.
 */
export function browse(concerts: readonly Concert[], query: BrowseQuery): BrowseResult {
  const { source, bands } = bandsToShow(concerts, query)
  const shownQuery = { ...query, bandIds: bands.map((band) => band.id) }
  const shown = concerts.filter((concert) => matchesQuery(concert, shownQuery))
  return { grouping: 'band', source, bands: groupByBand(bands, shown) }
}

/**
 * The visitor's bands when they have chosen any; otherwise the most popular bands
 * among the concerts the rest of the query lets through, so the page is never empty.
 */
function bandsToShow(
  concerts: readonly Concert[],
  query: BrowseQuery,
): { source: BandSource; bands: Band[] } {
  if (query.bandIds.length > 0) return { source: 'yours', bands: followedBands(concerts, query) }
  // Every filter except "followed band": a concert counts if its own band were followed.
  const candidates = concerts.filter((concert) =>
    matchesQuery(concert, { ...query, bandIds: [concert.band.id] }),
  )
  return { source: 'popular', bands: popularBands(candidates) }
}

/** The query's bands that appear in the data, in the visitor's order. */
function followedBands(concerts: readonly Concert[], query: BrowseQuery): Band[] {
  const known = new Map(concerts.map((concert) => [concert.band.id, concert.band]))
  return query.bandIds.flatMap((id) => known.get(id) ?? [])
}
