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

export interface BandGroupedResult {
  grouping: 'band'
  bands: BandGroup[]
  /** Why nothing is shown, or `null` when there are dates to show. */
  empty: EmptyReason | null
}

/**
 * Why a result has no dates: the visitor hasn't chosen any bands yet, or their
 * filters exclude every date of the bands they chose.
 */
export type EmptyReason = 'no-bands' | 'filters-too-narrow'
