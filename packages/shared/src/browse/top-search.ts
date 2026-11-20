import type { Band, Genre, Venue } from '../concert.ts'
import { searchByName } from './band-search.ts'
import type { BrowseQuery } from './query.ts'

/** Everything the top-bar search looks through. */
export interface SearchCatalog {
  bands: readonly Band[]
  genres: readonly Genre[]
  venues: readonly Venue[]
}

/** Top-bar search results, grouped by kind, each kind in match order. */
export interface TopSearchResult {
  bands: Band[]
  genres: Genre[]
  venues: Venue[]
}

/** Most results of each kind the top-bar search lists. */
const PER_KIND = 5

/**
 * Bands, genres and venues whose name matches the search text, matched like
 * `searchByName`. At most `PER_KIND` of each. Blank text finds nothing.
 */
export function topSearch(catalog: SearchCatalog, text: string): TopSearchResult {
  return {
    bands: searchByName(catalog.bands, text).slice(0, PER_KIND),
    genres: searchByName(catalog.genres, text).slice(0, PER_KIND),
    venues: searchByName(catalog.venues, text).slice(0, PER_KIND),
  }
}

/** One choosable search result. */
export type SearchOption =
  | { kind: 'band'; item: Band }
  | { kind: 'genre'; item: Genre }
  | { kind: 'venue'; item: Venue }

/** Search results as one list of options: bands, then genres, then venues. */
export function searchOptions(result: TopSearchResult): SearchOption[] {
  return [
    ...result.bands.map((item) => ({ kind: 'band', item }) as const),
    ...result.genres.map((item) => ({ kind: 'genre', item }) as const),
    ...result.venues.map((item) => ({ kind: 'venue', item }) as const),
  ]
}

/**
 * What choosing a search option does, for the page to carry out. `label` is shown
 * beside the option beforehand.
 * - `show-band`: set `bandIds` when `add` (the band wasn't yours yet), switch to
 *   grouping by band, and bring the band's column into view.
 * - `filter-genre`: set `genreIds` (the genre is checked; already-checked stays so).
 * - `filter-venue`: set `venueId`.
 */
export type SearchAction =
  | { kind: 'show-band'; band: Band; add: boolean; bandIds: string[]; label: 'Add' | 'Go to' }
  | {
      kind: 'filter-genre'
      genreIds: string[]
      label: 'Filter' | 'Filtered'
      announcement: string
    }
  | { kind: 'filter-venue'; venueId: string; label: 'Filter' | 'Filtered'; announcement: string }

export function searchAction(
  option: SearchOption,
  query: Pick<BrowseQuery, 'bandIds' | 'genreIds' | 'venueId'>,
): SearchAction {
  switch (option.kind) {
    case 'band': {
      const add = !query.bandIds.includes(option.item.id)
      return {
        kind: 'show-band',
        band: option.item,
        add,
        bandIds: add ? [...query.bandIds, option.item.id] : query.bandIds,
        label: add ? 'Add' : 'Go to',
      }
    }
    case 'genre': {
      const checked = query.genreIds.includes(option.item.id)
      return {
        kind: 'filter-genre',
        genreIds: checked ? query.genreIds : [...query.genreIds, option.item.id],
        label: checked ? 'Filtered' : 'Filter',
        announcement: `Showing ${option.item.name}.`,
      }
    }
    case 'venue':
      return {
        kind: 'filter-venue',
        venueId: option.item.id,
        label: query.venueId === option.item.id ? 'Filtered' : 'Filter',
        announcement: `Showing dates at ${option.item.name}.`,
      }
  }
}

/**
 * What screen readers hear after a `show-band` action: whether the band was added,
 * and whether its column is `shown` or hidden by the visitor's filters.
 */
export function bandShownAnnouncement(
  action: Extract<SearchAction, { kind: 'show-band' }>,
  shown: boolean,
): string {
  const name = action.band.name
  const added = action.add ? `Added ${name}. ` : ''
  return `${added}${shown ? `Showing ${name}.` : `${name} is hidden by your filters.`}`
}
