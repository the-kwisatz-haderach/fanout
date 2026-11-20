import type { Band, Concert } from '../concert.ts'
import { matchesQuery } from './filters.ts'
import { groupByBand } from './group-by-band.ts'
import { groupByDate } from './group-by-date.ts'
import type { BrowseQuery } from './query.ts'
import type { BrowseResult, DateSpan } from './result.ts'

/**
 * The page's only source of browse behaviour: takes every concert and the visitor's
 * query, returns a render-ready result. Pure: no React, no browser APIs, no input
 * mutation.
 */
export function browse(concerts: readonly Concert[], query: BrowseQuery): BrowseResult {
  const shown = concerts.filter((concert) => matchesQuery(concert, query))
  const bands = groupByBand(followedBands(concerts, query), shown)
  const span = dateSpan(shown)
  return query.grouping === 'date'
    ? { grouping: 'date', days: groupByDate(bands), span }
    : { grouping: 'band', bands, span }
}

/** First and last date among the shown concerts. */
function dateSpan(shown: readonly Concert[]): DateSpan | null {
  const dates = shown.map((concert) => concert.date).sort()
  const firstDate = dates[0]
  const lastDate = dates.at(-1)
  return firstDate && lastDate ? { firstDate, lastDate } : null
}

/** The query's bands that appear in the data, in the visitor's order. */
function followedBands(concerts: readonly Concert[], query: BrowseQuery): Band[] {
  const known = new Map(concerts.map((concert) => [concert.band.id, concert.band]))
  return query.bandIds.flatMap((id) => known.get(id) ?? [])
}
