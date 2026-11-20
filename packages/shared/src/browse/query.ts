import { DEFAULT_DATE_RANGE_ID, type DateRangeId } from '../date-range.ts'

export type Grouping = 'band' | 'date'

/**
 * What the visitor asked to see. The full shape from the spec is declared up front;
 * fields marked "Not applied yet" are accepted but ignored by `browse()` until their
 * ticket lands.
 */
export interface BrowseQuery {
  /** The visitor's bands, in the order they chose them. One column per known band. */
  bandIds: string[]
  /** Only show bands in any of these genres. Empty means all genres. Not applied yet (#9). */
  genreIds: string[]
  /** The visitor's city; dates there are "near you". `null` is any city. Not applied yet (#7). */
  cityId: string | null
  /** Window of upcoming dates to show. Not applied yet (#7). */
  dateRangeId: DateRangeId
  /** Hide dates that aren't near you. Not applied yet (#7). */
  nearMeOnly: boolean
  /** Keep only dates where a going fan shares your bands. Not applied yet (#8). */
  fansLikeMeOnly: boolean
  /** Columns by band, or day headings by date. */
  grouping: Grouping
}

export const DEFAULT_BROWSE_QUERY: BrowseQuery = {
  bandIds: [],
  genreIds: [],
  cityId: null,
  dateRangeId: DEFAULT_DATE_RANGE_ID,
  nearMeOnly: false,
  fansLikeMeOnly: false,
  grouping: 'band',
}
