import { DEFAULT_DATE_RANGE_ID, type DateRangeId } from '../date-range.ts'
import type { IsoDate } from '../iso-date.ts'

export type Grouping = 'band' | 'date'

/** What the visitor asked to see. `browse()` applies every field. */
export interface BrowseQuery {
  /** The visitor's bands, in the order they chose them. One column per known band. */
  bandIds: string[]
  /** Only show bands in any of these genres. Empty means all genres. */
  genreIds: string[]
  /** The visitor's city; dates there are "near you". `null` is any city. */
  cityId: string | null
  /** Window of upcoming dates to show, counted from `BrowseContext.today`. */
  dateRangeId: DateRangeId
  /** Hide dates that aren't near you. Ignored when no city is selected. */
  nearMeOnly: boolean
  /** Keep only dates where a going fan shares your bands. */
  fansLikeMeOnly: boolean
  /** Columns by band, or day headings by date. */
  grouping: Grouping
  /** Only show dates at this venue (chosen from the top-bar search). `null` is any venue. */
  venueId: string | null
}

export const DEFAULT_BROWSE_QUERY: BrowseQuery = {
  bandIds: [],
  genreIds: [],
  cityId: null,
  dateRangeId: DEFAULT_DATE_RANGE_ID,
  nearMeOnly: false,
  fansLikeMeOnly: false,
  grouping: 'band',
  venueId: null,
}

/** Facts about the moment of browsing that aren't the visitor's choice. */
export interface BrowseContext {
  /** Today's calendar date. Dates before it are past. */
  today: IsoDate
}
