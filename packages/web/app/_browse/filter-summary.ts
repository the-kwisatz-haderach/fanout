import type { BrowseQuery, Genre, Venue } from "@fanout/shared";

/**
 * Short phrases for the filter panel's controls as they stand, for the collapsed
 * yellow bar on phones: your bands, genres, the chosen venue, then any toggles that
 * are on. "Near me" only counts with a city, since without one it changes nothing.
 */
export function filterSummary(
  query: BrowseQuery,
  names: { genres: readonly Genre[]; venues: readonly Venue[] },
): string[] {
  const count = query.bandIds.length;
  const parts = [count === 0 ? "No bands yet" : `${count} ${count === 1 ? "band" : "bands"}`];

  const chosenGenres = names.genres.filter((genre) => query.genreIds.includes(genre.id));
  parts.push(
    chosenGenres.length === 0 ? "All genres" : chosenGenres.map((genre) => genre.name).join(", "),
  );

  const venue = names.venues.find((v) => v.id === query.venueId);
  if (venue) parts.push(`At ${venue.name}`);

  if (query.nearMeOnly && query.cityId !== null) parts.push("Near me");
  if (query.fansLikeMeOnly) parts.push("Fans like me");
  return parts;
}
