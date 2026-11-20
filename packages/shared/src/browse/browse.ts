import type { Band, Concert } from '../concert.ts'
import { isInChosenGenres, matchesQuery } from './filters.ts'
import { groupByBand } from './group-by-band.ts'
import { groupByDate } from './group-by-date.ts'
import { keepNearMe } from './near-me.ts'
import type { BrowseContext, BrowseQuery } from './query.ts'
import type { BrowseResult, DateSpan, EmptyReason } from './result.ts'

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
  const bands = groupByBand(followedBands(concerts, query), shown, query)
  const span = dateSpan(shown)
  const empty = emptyReason(concerts, query, shown)
  return query.grouping === 'date'
    ? { grouping: 'date', days: groupByDate(bands), span, empty }
    : { grouping: 'band', bands, span, empty }
}

/** First and last date among the shown concerts. */
function dateSpan(shown: readonly Concert[]): DateSpan | null {
  const dates = shown.map((concert) => concert.date).sort()
  const firstDate = dates[0]
  const lastDate = dates.at(-1)
  return firstDate && lastDate ? { firstDate, lastDate } : null
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
