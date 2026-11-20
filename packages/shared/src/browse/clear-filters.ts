import type { BrowseQuery } from './query.ts'

/**
 * The query with every filter (genres, city, date range, venue, toggles) back at
 * `defaults`, the page's starting values. Keeps the visitor's chosen bands and their
 * grouping, which are not filters.
 */
export function clearFilters(query: BrowseQuery, defaults: BrowseQuery): BrowseQuery {
  return { ...defaults, bandIds: query.bandIds, grouping: query.grouping }
}
