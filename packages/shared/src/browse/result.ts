import type { Band, Concert } from '../concert.ts'

/**
 * One date as the page renders it. Per-date render facts (near you, tag size, ...)
 * are added here as fields, so components never derive them.
 */
export interface DateEntry {
  concert: Concert
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
export type BrowseResult = BandGroupedResult

/**
 * Where the shown bands come from: the visitor's own (`'yours'`), or popular bands
 * standing in because they haven't chosen any yet (`'popular'`).
 */
export type BandSource = 'yours' | 'popular'

export interface BandGroupedResult {
  grouping: 'band'
  source: BandSource
  bands: BandGroup[]
}
