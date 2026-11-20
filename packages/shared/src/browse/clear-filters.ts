import { DEFAULT_BROWSE_QUERY, type BrowseQuery } from './query.ts'

/**
 * The query with every filter (genres, city, date range, toggles) back at its
 * default. Keeps the visitor's chosen bands and their grouping, which are not filters.
 * `defaults` lets the page supply its own starting values, such as its default city.
 */
export function clearFilters(
  query: BrowseQuery,
  defaults: BrowseQuery = DEFAULT_BROWSE_QUERY,
): BrowseQuery {
  return { ...defaults, bandIds: query.bandIds, grouping: query.grouping }
}
