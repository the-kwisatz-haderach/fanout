import type { Band, Concert } from '../concert.ts'
import type { DateSpan, IsoDate } from '../iso-date.ts'
import type { FansTag } from './fans-tag.ts'
import type { TicketNote } from './ticket-note.ts'

/**
 * One date as the page renders it. Per-date render facts (near you, tag size, ...)
 * are added here as fields, so components never derive them.
 */
export interface DateEntry {
  concert: Concert
  /** In the visitor's selected city. Always `false` when no city is selected. */
  near: boolean
  /** Sold-out or low-availability call-out, `null` when tickets are available. */
  ticketNote: TicketNote | null
  /** Fans-going tag, `null` when the date isn't near you or nobody is going yet. */
  fansTag: FansTag | null
}

/** One band column: the band and its shown dates in date order. Never empty. */
export interface BandGroup {
  band: Band
  summary: TourSummary
  dates: DateEntry[]
  /**
   * A city is selected and none of the band's shown dates are near it; they are all
   * shown quieter. With "only dates near me" on, they are its `nearestDates`.
   */
  noDatesNear: boolean
}

/** Facts for a band's tour summary line, over its shown dates. */
export interface TourSummary {
  dateCount: number
  cityCount: number
  /** First and last shown date. */
  span: DateSpan
}

/** Render-ready output of `browse()`. Discriminated by grouping. */
export type BrowseResult = BandGroupedResult | DateGroupedResult

/**
 * Where the shown bands come from: the visitor's own (`'yours'`), or popular bands
 * standing in because they haven't chosen any yet (`'popular'`).
 */
export type BandSource = 'yours' | 'popular'

export interface BandGroupedResult {
  grouping: 'band'
  source: BandSource
  bands: BandGroup[]
  /** First and last shown date, or `null` when nothing is shown. */
  span: DateSpan | null
  /** Why nothing is shown, or `null` when there are dates to show. */
  empty: EmptyReason | null
}

/** The same shown dates as by band, under day headings in date order. */
export interface DateGroupedResult {
  grouping: 'date'
  source: BandSource
  days: DayGroup[]
  /** First and last shown date, or `null` when nothing is shown. */
  span: DateSpan | null
  /** Why nothing is shown, or `null` when there are dates to show. */
  empty: EmptyReason | null
}

/** One day heading and its dates, in the by-band result's band order. */
export interface DayGroup {
  date: IsoDate
  dates: DateEntry[]
}

/**
 * Why a result has no dates:
 * - `'no-bands'`: filters are not the cause. There are no upcoming dates at all for
 *   the bands in question: the visitor's chosen bands, or, with none chosen, any band.
 * - `'filters-too-narrow'`: there are upcoming dates, but the filters exclude them
 *   all (whether the bands are the visitor's own or popular stand-ins).
 */
export type EmptyReason = 'no-bands' | 'filters-too-narrow'
