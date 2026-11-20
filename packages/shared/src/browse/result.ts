import type { Band, Concert } from '../concert.ts'

/**
 * One date as the page renders it. Per-date render facts (near you, tag size, ...)
 * are added here as fields, so components never derive them.
 */
export interface DateEntry {
  concert: Concert
  /** In the visitor's selected city. Always `false` when no city is selected. */
  near: boolean
}

/** One band column: the band and its shown dates in date order. */
export interface BandGroup {
  band: Band
  summary: TourSummary
  dates: DateEntry[]
  /**
   * A city is selected and none of the band's dates in the window are near it. Its
   * `dates` are then its nearest dates, shown quieter.
   */
  noDatesNear: boolean
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
}
