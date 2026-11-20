import type { TicketState } from '../concert.ts'

/**
 * A ticket state worth calling out on a date, with the words screen readers announce.
 * Shown through type style only (struck through / dashed underline), never colour.
 */
export type TicketNote =
  | { state: 'sold-out'; label: 'Sold out' }
  | { state: 'low'; label: 'Few tickets left' }

/** The note for each ticket state; `null` when tickets are simply available. */
const TICKET_NOTES: Record<TicketState, TicketNote | null> = {
  'sold-out': { state: 'sold-out', label: 'Sold out' },
  low: { state: 'low', label: 'Few tickets left' },
  available: null,
}

/** The note for a ticket state, or `null` when tickets are simply available. */
export function ticketNote(tickets: TicketState): TicketNote | null {
  return TICKET_NOTES[tickets]
}
