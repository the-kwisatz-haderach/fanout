import type { Genre, Venue } from '../concert.ts'
import { findById } from '../find-by-id.ts'
import { plural } from '../plural.ts'
import { nearMeApplies } from './near-me.ts'
import type { BrowseQuery } from './query.ts'

/**
 * Short phrases for the filter panel's controls as they stand (for the collapsed
 * filter bar on phones): your bands, genres, the chosen venue, then any toggles that
 * change what is shown. "Near me" only counts when it applies (`nearMeApplies`).
 */
export function filterSummary(
  query: BrowseQuery,
  names: { genres: readonly Genre[]; venues: readonly Venue[] },
): string[] {
  const count = query.bandIds.length
  const parts = [count === 0 ? 'No bands yet' : plural(count, 'band')]

  const chosenGenres = names.genres.filter((genre) => query.genreIds.includes(genre.id))
  parts.push(
    chosenGenres.length === 0 ? 'All genres' : chosenGenres.map((genre) => genre.name).join(', '),
  )

  const venue = findById(names.venues, query.venueId)
  if (venue) parts.push(`At ${venue.name}`)

  if (nearMeApplies(query)) parts.push('Near me')
  if (query.fansLikeMeOnly) parts.push('Fans like me')
  return parts
}
