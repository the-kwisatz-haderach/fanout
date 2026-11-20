"use client";

import { CITY_OPTIONS } from "./cities";
import { useBrowseQueryContext } from "./use-browse-query";

/** Where "near you" is: dates in this city stand out. */
export function CitySelect({ className }: { className: string }) {
  const { query, setCityId } = useBrowseQueryContext();

  return (
    <label className="flex items-center gap-2">
      <span className="sr-only">Your city</span>
      <select
        name="city"
        value={query.cityId ?? ""}
        onChange={(event) => setCityId(event.target.value || null)}
        className={className}
      >
        <option value="">Any city</option>
        {CITY_OPTIONS.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>
    </label>
  );
}
