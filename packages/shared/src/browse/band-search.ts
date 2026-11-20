import type { Band } from '../concert.ts'

/** Most bands the "Add a band" search lists at once. */
export const BAND_MATCH_LIMIT = 8

/**
 * Bands the visitor could add for the search text: matched like `searchByName`,
 * leaving out bands already chosen, at most `BAND_MATCH_LIMIT`.
 */
export function searchBands(
  bands: readonly Band[],
  text: string,
  chosenIds: readonly string[],
): Band[] {
  return searchByName(bands, text)
    .filter((band) => !chosenIds.includes(band.id))
    .slice(0, BAND_MATCH_LIMIT)
}

/**
 * Items whose name contains the search text, ignoring case and accents. Names that
 * start with the text come first, then names with a word that does, then the rest;
 * each tier by name. Blank text finds nothing.
 */
export function searchByName<T extends { name: string }>(items: readonly T[], text: string): T[] {
  const needle = fold(text.trim())
  if (needle === '') return []
  return items
    .map((item) => ({ item, rank: matchRank(fold(item.name), needle) }))
    .filter((match): match is { item: T; rank: number } => match.rank !== null)
    .sort((a, b) => a.rank - b.rank || a.item.name.localeCompare(b.item.name))
    .map((match) => match.item)
}

function matchRank(name: string, needle: string): number | null {
  if (name.startsWith(needle)) return 0
  if (name.split(/\s+/).some((word) => word.startsWith(needle))) return 1
  if (name.includes(needle)) return 2
  return null
}

/** Lower-case without accents, so "vaster" finds "Västerhavet". */
function fold(text: string): string {
  return text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()
}
