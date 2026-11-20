/** A preset window of upcoming dates a visitor can browse. */
export interface DateRange {
  id: DateRangeId
  label: string
  /** Length of the window in days, counted from today. */
  days: number
}

export type DateRangeId = 'next-30-days' | 'next-3-months' | 'next-12-months'

export const DATE_RANGES: readonly DateRange[] = [
  { id: 'next-30-days', label: 'Next 30 days', days: 30 },
  { id: 'next-3-months', label: 'Next 3 months', days: 91 },
  { id: 'next-12-months', label: 'Next 12 months', days: 365 },
]

export const DEFAULT_DATE_RANGE_ID: DateRangeId = 'next-3-months'
