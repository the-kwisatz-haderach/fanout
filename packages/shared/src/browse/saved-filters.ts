import { DATE_RANGES } from '../date-range.ts'
import type { BrowseQuery } from './query.ts'

/**
 * The parts of a BrowseQuery that are filters: every field except the chosen bands
 * and the grouping. A filter added to BrowseQuery later is included automatically.
 */
export type BrowseFilters = Omit<BrowseQuery, 'bandIds' | 'grouping'>

/** The query's filters, ready to save for the visitor's next visit. */
export function savedFiltersOf(query: BrowseQuery): BrowseFilters {
  const filters: Partial<BrowseQuery> = { ...query }
  delete filters.bandIds
  delete filters.grouping
  return filters as BrowseFilters
}

/**
 * The filters to open with, from whatever was saved (`null` if nothing was).
 * Each filter field is restored on its own when the saved value has the same kind
 * as the default (strings, a string or none, true/false, a list of strings);
 * anything missing or malformed falls back to `defaults`.
 */
export function restoreFilters(stored: unknown, defaults: BrowseQuery): BrowseFilters {
  const restored: Record<string, unknown> = { ...savedFiltersOf(defaults) }
  if (typeof stored !== 'object' || stored === null || Array.isArray(stored)) {
    return restored as unknown as BrowseFilters
  }
  const saved = stored as Record<string, unknown>
  for (const key of Object.keys(restored)) {
    if (key in saved && fitsField(key, saved[key], restored[key])) restored[key] = saved[key]
  }
  return restored as unknown as BrowseFilters
}

function fitsField(key: string, value: unknown, fallback: unknown): boolean {
  if (key === 'dateRangeId') return DATE_RANGES.some((range) => range.id === value)
  if (Array.isArray(fallback)) {
    return Array.isArray(value) && value.every((item) => typeof item === 'string')
  }
  if (typeof fallback === 'boolean') return typeof value === 'boolean'
  if (typeof fallback === 'string' || fallback === null) {
    return typeof value === 'string' || value === null
  }
  return typeof value === typeof fallback
}
