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
  /** Calendar date of the show, `YYYY-MM-DD`. Sorts as a string. */
  date: string
  tickets: TicketState
  fans: FanSignal
}
