/** A count with its noun, e.g. "1 band", "3 bands", "2 cities". */
export function plural(count: number, one: string, many = `${one}s`): string {
  return `${count} ${count === 1 ? one : many}`
}
