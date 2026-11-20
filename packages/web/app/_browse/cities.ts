import type { City } from "@fanout/shared";
import { SAMPLE_CITIES } from "@/sample-data";

/** Cities the visitor can choose, by name. */
export const CITY_OPTIONS: readonly City[] = [...Object.values(SAMPLE_CITIES)].sort((a, b) =>
  a.name.localeCompare(b.name, "en"),
);

/** Display name for a selected city id, or `null` for any city. */
export function cityName(cityId: string | null): string | null {
  return CITY_OPTIONS.find((city) => city.id === cityId)?.name ?? null;
}
