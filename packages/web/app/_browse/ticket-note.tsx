import type { TicketNote } from "@fanout/shared";

/**
 * Type-style treatment for a date's ticket state: sold out is struck through,
 * few tickets left gets a dashed underline. Never changes colour.
 */
export function ticketNoteClass(note: TicketNote | null): string {
  return note ? TICKET_NOTE_CLASS[note.state] : "";
}

const TICKET_NOTE_CLASS: Record<TicketNote["state"], string> = {
  "sold-out": "line-through decoration-2",
  low: "underline decoration-dashed decoration-2 underline-offset-4",
};

/** The ticket state in words, for screen readers only. */
export function TicketNoteLabel({ note }: { note: TicketNote | null }) {
  if (!note) return null;
  return <span className="sr-only">, {note.label}</span>;
}
