import type { Concert } from '../concert.ts'
import type { BrowseQuery } from './query.ts'
import type { DateEntry } from './result.ts'

/**
 * Whether a date is near the visitor. For the prototype, near means in the selected
 * city; how far "near" reaches is an open product decision. No city, nothing is near.
 */
export function isNear(concert: Concert, query: BrowseQuery): boolean {
  return query.cityId !== null && concert.venue.city.id === query.cityId
}

/** A city is selected and none of a band's dates in view are in it. */
export function hasNoDatesNear(dates: readonly DateEntry[], query: BrowseQuery): boolean {
  return query.cityId !== null && !dates.some((entry) => entry.near)
}

/** How many of a band's dates stand in as its nearest when none are near. */
const NEAREST_DATE_COUNT = 3

/**
 * With "only dates near me" on, keeps each band's near dates. A band with none keeps
 * its soonest few instead, so its column can say so and still show where it plays.
 * Without a city there is nothing to keep, so the toggle changes nothing.
 */
export function keepNearMe(concerts: readonly Concert[], query: BrowseQuery): Concert[] {
  if (!query.nearMeOnly || query.cityId === null) return [...concerts]
  const bandsWithNearDates = new Set(
    concerts.filter((concert) => isNear(concert, query)).map((concert) => concert.band.id),
  )
  const nearest = new Set<Concert>()
  const taken = new Map<string, number>()
  for (const concert of [...concerts].sort(soonestFirst)) {
    if (bandsWithNearDates.has(concert.band.id)) continue
    const count = taken.get(concert.band.id) ?? 0
    if (count < NEAREST_DATE_COUNT) nearest.add(concert)
    taken.set(concert.band.id, count + 1)
  }
  return concerts.filter((concert) => isNear(concert, query) || nearest.has(concert))
}

function soonestFirst(a: Concert, b: Concert): number {
  return a.date < b.date ? -1 : a.date > b.date ? 1 : a.id < b.id ? -1 : 1
}
