import type { Band, Concert } from '../concert.ts'
import { isInChosenGenres, matchesQuery } from './filters.ts'
import { groupByBand } from './group-by-band.ts'
import { popularBands } from './popular-bands.ts'
import type { BrowseQuery } from './query.ts'
import type { BandSource, BrowseResult, EmptyReason } from './result.ts'

/**
 * The page's only source of browse behaviour: takes every concert and the visitor's
 * query, returns a render-ready result. Pure: no React, no browser APIs, no input
 * mutation.
 */
export function browse(concerts: readonly Concert[], query: BrowseQuery): BrowseResult {
  const { source, bands } = bandsToShow(concerts, query)
  const shownQuery = { ...query, bandIds: bands.map((band) => band.id) }
  const shown = concerts.filter((concert) => matchesQuery(concert, shownQuery))
  return {
    grouping: 'band',
    source,
    bands: groupByBand(bands, shown),
    // The visitor's own bands decide "no bands" vs "filters too narrow", even if filters hid them.
    empty: emptyReason(concerts, source === 'yours' ? query : shownQuery, shown),
  }
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
