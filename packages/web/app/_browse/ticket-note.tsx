import type { TicketNote } from "@fanout/shared";

/**
 * Type-style treatment for a date's ticket state: sold out is struck through,
 * few tickets left gets a dashed underline. Never changes colour.
 */
export function ticketNoteClass(note: TicketNote | null): string {
  switch (note?.state) {
    case "sold-out":
      return "line-through decoration-2";
    case "low":
      return "underline decoration-dashed decoration-2 underline-offset-4";
    default:
      return "";
  }
}

/** The ticket state in words, for screen readers only. */
export function TicketNoteLabel({ note }: { note: TicketNote | null }) {
  if (!note) return null;
  return <span className="sr-only">, {note.label}</span>;
}
