import type { Band, Concert } from '../concert.ts'
import { dateSpan } from '../iso-date.ts'
import { isInChosenGenres, matchesQuery } from './filters.ts'
import { groupByBand } from './group-by-band.ts'
import { groupByDate } from './group-by-date.ts'
import { keepNearMe } from './near-me.ts'
import { popularBands } from './popular-bands.ts'
import { rankBands } from './rank-bands.ts'
import type { BrowseContext, BrowseQuery } from './query.ts'
import type { BandSource, BrowseResult, EmptyReason } from './result.ts'

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
  const { source, bands: shownBands } = bandsToShow(concerts, query, context)
  const shownQuery = { ...query, bandIds: shownBands.map((band) => band.id) }
  const inView = concerts.filter((concert) => matchesQuery(concert, shownQuery, context))
  const shown = keepNearMe(inView, shownQuery)
  const bands = rankBands(groupByBand(shownBands, shown, shownQuery))
  const span = dateSpan(shown.map((concert) => concert.date))
  const empty = shown.length > 0 ? null : emptyReason(concerts, query, context)
  return query.grouping === 'date'
    ? { grouping: 'date', source, days: groupByDate(bands), span, empty }
    : { grouping: 'band', source, bands, span, empty }
}

/**
 * The visitor's bands when they have chosen any; otherwise the most popular bands
 * among the concerts the rest of the query lets through, so the page is never empty.
 */
function bandsToShow(
  concerts: readonly Concert[],
  query: BrowseQuery,
  context: BrowseContext,
): { source: BandSource; bands: Band[] } {
  if (query.bandIds.length > 0) return { source: 'yours', bands: followedBands(concerts, query) }
  // Every filter except "followed band": a concert counts if its own band were followed.
  const candidates = concerts.filter((concert) =>
    matchesQuery(concert, { ...query, bandIds: [concert.band.id] }, context),
  )
  return { source: 'popular', bands: popularBands(candidates) }
}

/**
 * Why nothing is shown. Filters are the cause unless the bands in question (the
 * visitor's own, or with none chosen, every band) have no upcoming dates at all.
 */
function emptyReason(
  concerts: readonly Concert[],
  query: BrowseQuery,
  { today }: BrowseContext,
): EmptyReason {
  const inQuestion = (concert: Concert) =>
    query.bandIds.length === 0 || query.bandIds.includes(concert.band.id)
  const hasUpcoming = concerts.some((concert) => inQuestion(concert) && concert.date >= today)
  return hasUpcoming ? 'filters-too-narrow' : 'no-bands'
}

/** The query's bands that appear in the data and pass the genre filter. */
function followedBands(concerts: readonly Concert[], query: BrowseQuery): Band[] {
  const known = new Map(concerts.map((concert) => [concert.band.id, concert.band]))
  return query.bandIds
    .flatMap((id) => known.get(id) ?? [])
    .filter((band) => isInChosenGenres(band, query))
}
