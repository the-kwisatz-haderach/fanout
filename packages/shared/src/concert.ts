import type { IsoDate } from './iso-date.ts'

/** A city concerts take place in. "Near you" means in the selected city. */
export interface City {
  id: string
  name: string
}

export interface Venue {
  id: string
  name: string
  city: City
}

export interface Genre {
  id: string
  name: string
}

export interface Band {
  id: string
  name: string
  genres: Genre[]
}

/** How many tickets are left for a concert. */
export type TicketState = 'available' | 'low' | 'sold-out'

/** Who is going to a concert, as counts only: no faces, names or profiles. */
export interface FanSignal {
  /** Fans going to this concert. */
  going: number
  /** Of those, how many share at least one of the visitor's bands. */
  sharesYourBands: number
}

/** One date on a band's tour. */
export interface Concert {
  id: string
  band: Band
  venue: Venue
  /** Calendar date of the show. */
  date: IsoDate
  tickets: TicketState
  fans: FanSignal
}

/** A venue as listed on its own, e.g. "Big Hall, Stockholm". */
export function venueLabel(venue: Venue): string {
  return `${venue.name}, ${venue.city.name}`
}

/** Orders concerts soonest first; same-day concerts by id, so the order is stable. */
export function bySoonest(a: Concert, b: Concert): number {
  return a.date < b.date ? -1 : a.date > b.date ? 1 : a.id < b.id ? -1 : a.id > b.id ? 1 : 0
}
