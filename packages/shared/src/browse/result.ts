import type { Band, Concert } from '../concert.ts'
import type { TicketNote } from './ticket-note.ts'

/**
 * One date as the page renders it. Per-date render facts (near you, tag size, ...)
 * are added here as fields, so components never derive them.
 */
export interface DateEntry {
  concert: Concert
  /** Sold-out or low-availability call-out, `null` when tickets are available. */
  ticketNote: TicketNote | null
}

/** One band column: the band and its shown dates in date order. */
export interface BandGroup {
  band: Band
  summary: TourSummary
  dates: DateEntry[]
}

/** Facts for a band's tour summary line, over its shown dates. */
export interface TourSummary {
  dateCount: number
  cityCount: number
  /** `YYYY-MM-DD`, or `null` when no dates are shown. */
  firstDate: string | null
  lastDate: string | null
}

/** Render-ready output of `browse()`. Discriminated by grouping. */
export type BrowseResult = BandGroupedResult | DateGroupedResult

export interface BandGroupedResult {
  grouping: 'band'
  bands: BandGroup[]
  /** First and last shown date, or `null` when nothing is shown. */
  span: DateSpan | null
}

/** The same shown dates as by band, under day headings in date order. */
export interface DateGroupedResult {
  grouping: 'date'
  days: DayGroup[]
  /** First and last shown date, or `null` when nothing is shown. */
  span: DateSpan | null
}

/** One day heading and its dates, in the by-band result's band order. */
export interface DayGroup {
  /** `YYYY-MM-DD`. */
  date: string
  dates: DateEntry[]
}

/** An inclusive range of `YYYY-MM-DD` dates. */
export interface DateSpan {
  firstDate: string
  lastDate: string
}
