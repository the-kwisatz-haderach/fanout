import type { Band, Genre, Venue } from '../concert.ts'
import { searchByName } from './band-search.ts'

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

/**
 * Bands, genres and venues whose name matches the search text, matched like
 * `searchBands`. At most `perKind` of each (default 5). Blank text finds nothing.
 */
export function topSearch(
  catalog: SearchCatalog,
  text: string,
  { perKind = 5 }: { perKind?: number } = {},
): TopSearchResult {
  return {
    bands: searchByName(catalog.bands, text).slice(0, perKind),
    genres: searchByName(catalog.genres, text).slice(0, perKind),
    venues: searchByName(catalog.venues, text).slice(0, perKind),
  }
}
