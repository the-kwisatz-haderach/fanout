import type { BrowseQuery, Genre } from "@fanout/shared";

/**
 * Short phrases for the filter panel's controls as they stand, for the collapsed
 * yellow bar on phones: your bands, genres, then any toggles that are on.
 * "Near me" only counts with a city, since without one it changes nothing.
 */
export function filterSummary(query: BrowseQuery, genres: readonly Genre[]): string[] {
  const count = query.bandIds.length;
  const parts = [count === 0 ? "No bands yet" : `${count} ${count === 1 ? "band" : "bands"}`];

  const chosenGenres = genres.filter((genre) => query.genreIds.includes(genre.id));
  parts.push(
    chosenGenres.length === 0 ? "All genres" : chosenGenres.map((genre) => genre.name).join(", "),
  );

  if (query.nearMeOnly && query.cityId !== null) parts.push("Near me");
  if (query.fansLikeMeOnly) parts.push("Fans like me");
  return parts;
}
