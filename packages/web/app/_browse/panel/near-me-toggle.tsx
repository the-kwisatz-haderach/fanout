"use client";

import { useBrowseQuery } from "../use-browse-query";

/** Hides dates that aren't near the visitor's city. */
export function NearMeToggle() {
  const { query, setNearMeOnly } = useBrowseQuery();
  const noCity = query.cityId === null;

  return (
    <label className="flex items-start gap-3 font-semibold">
      <input
        type="checkbox"
        name="near-me-only"
        checked={query.nearMeOnly}
        onChange={(event) => setNearMeOnly(event.target.checked)}
        aria-describedby={noCity ? "near-me-no-city" : undefined}
        className="mt-0.5 size-5 shrink-0 accent-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      />
      <span>
        Only dates near me
        {noCity && (
          <span id="near-me-no-city" className="block text-sm font-normal">
            Choose a city to use this.
          </span>
        )}
      </span>
    </label>
  );
}
