import type { Band } from '../concert.ts'

/**
 * Bands whose name contains the search text, ignoring case and accents. Names that
 * start with the text come first, then names with a word that does, then the rest;
 * each tier by name. Blank text finds nothing.
 */
export function searchBands(bands: readonly Band[], text: string): Band[] {
  const needle = fold(text.trim())
  if (needle === '') return []
  return bands
    .map((band) => ({ band, rank: matchRank(fold(band.name), needle) }))
    .filter((match): match is { band: Band; rank: number } => match.rank !== null)
    .sort((a, b) => a.rank - b.rank || a.band.name.localeCompare(b.band.name))
    .map((match) => match.band)
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
