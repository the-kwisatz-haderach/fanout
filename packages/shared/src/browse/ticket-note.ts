import type { TicketState } from '../concert.ts'

/**
 * A ticket state worth calling out on a date, with the words screen readers announce.
 * Shown through type style only (struck through / dashed underline), never colour.
 */
export type TicketNote =
  | { state: 'sold-out'; label: 'Sold out' }
  | { state: 'low'; label: 'Few tickets left' }

/** The note for a ticket state, or `null` when tickets are simply available. */
export function ticketNote(tickets: TicketState): TicketNote | null {
  switch (tickets) {
    case 'sold-out':
      return { state: 'sold-out', label: 'Sold out' }
    case 'low':
      return { state: 'low', label: 'Few tickets left' }
    case 'available':
      return null
  }
}
