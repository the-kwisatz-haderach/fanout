import { bySoonest, type Concert } from '../concert.ts'
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

/**
 * Whether "only dates near me" changes anything: it is on and a city is selected.
 * Without a city nothing is near, so the toggle is ignored.
 */
export function nearMeApplies(query: Pick<BrowseQuery, 'nearMeOnly' | 'cityId'>): boolean {
  return query.nearMeOnly && query.cityId !== null
}

/** How many dates stand in as a band's nearest when none are near. */
export const NEAREST_DATE_COUNT = 3

/**
 * A band's "nearest dates", shown when none of its dates are near you: its soonest
 * `NEAREST_DATE_COUNT` dates.
 *
 * OPEN PRODUCT DECISION: there is no distance data yet, so "nearest" cannot mean
 * closest on a map. Soonest is the prototype's stand-in; replace this rule (and only
 * this rule) once how far "near" reaches is decided.
 */
export function nearestDates(bandConcerts: readonly Concert[]): Concert[] {
  return [...bandConcerts].sort(bySoonest).slice(0, NEAREST_DATE_COUNT)
}

/**
 * With "only dates near me" applying, keeps each band's near dates. A band with none
 * keeps its `nearestDates` instead, so its column can say so and still show where
 * it plays. Otherwise every date is kept.
 */
export function keepNearMe(concerts: readonly Concert[], query: BrowseQuery): Concert[] {
  if (!nearMeApplies(query)) return [...concerts]
  const byBand = new Map<string, Concert[]>()
  for (const concert of concerts) {
    byBand.set(concert.band.id, [...(byBand.get(concert.band.id) ?? []), concert])
  }
  const kept = new Set<Concert>()
  for (const bandConcerts of byBand.values()) {
    const near = bandConcerts.filter((concert) => isNear(concert, query))
    for (const concert of near.length > 0 ? near : nearestDates(bandConcerts)) kept.add(concert)
  }
  return concerts.filter((concert) => kept.has(concert))
}
