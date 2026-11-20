/** The item with this id, or `undefined` when the id is `null` or unknown. */
export function findById<T extends { id: string }>(
  items: readonly T[],
  id: string | null,
): T | undefined {
  return id === null ? undefined : items.find((item) => item.id === id)
}
