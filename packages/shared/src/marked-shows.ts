/**
 * Marked shows: the visitor's shortlist of concerts, as concert ids in the order
 * they were marked.
 */

/** Marks `concertId` if it isn't marked yet, otherwise unmarks it. Returns a new list. */
export function toggleMarkedShow(markedIds: readonly string[], concertId: string): string[] {
  return markedIds.includes(concertId)
    ? markedIds.filter((id) => id !== concertId)
    : [...markedIds, concertId]
}
