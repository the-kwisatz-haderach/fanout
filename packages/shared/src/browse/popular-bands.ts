import type { Band, Concert } from '../concert.ts'

/** How many popular bands stand in for the visitor's own before they choose any. */
export const POPULAR_BAND_COUNT = 6

/**
 * The bands with the most fans going across the given concerts, most first; ties
 * break by band name. At most `POPULAR_BAND_COUNT`.
 */
export function popularBands(concerts: readonly Concert[]): Band[] {
  const going = new Map<string, { band: Band; total: number }>()
  for (const concert of concerts) {
    const entry = going.get(concert.band.id) ?? { band: concert.band, total: 0 }
    entry.total += concert.fans.going
    going.set(concert.band.id, entry)
  }
  return [...going.values()]
    .sort((a, b) => b.total - a.total || a.band.name.localeCompare(b.band.name))
    .slice(0, POPULAR_BAND_COUNT)
    .map((entry) => entry.band)
}
