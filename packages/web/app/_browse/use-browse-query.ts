"use client";

import { createContext, useContext, useState } from "react";
import { clearFilters, type BrowseQuery, type DateRangeId, type Grouping } from "@fanout/shared";

/**
 * The visitor's BrowseQuery as client state: one setter per field, plus
 * `clearFilters`, which puts every filter back to `defaults` but keeps the bands.
 * Called once, by `BrowseQueryProvider`; components read it with `useBrowseQueryContext`.
 */
export function useBrowseQuery(defaults: BrowseQuery) {
  const [query, setQuery] = useState(defaults);

  return {
    query,
    setGenreIds: (genreIds: string[]) => setQuery((q) => ({ ...q, genreIds })),
    setCityId: (cityId: string | null) => setQuery((q) => ({ ...q, cityId })),
    setDateRangeId: (dateRangeId: DateRangeId) => setQuery((q) => ({ ...q, dateRangeId })),
    setNearMeOnly: (nearMeOnly: boolean) => setQuery((q) => ({ ...q, nearMeOnly })),
    setFansLikeMeOnly: (fansLikeMeOnly: boolean) => setQuery((q) => ({ ...q, fansLikeMeOnly })),
    setGrouping: (grouping: Grouping) => setQuery((q) => ({ ...q, grouping })),
    clearFilters: () => setQuery((q) => clearFilters(q, defaults)),
  };
}

export type BrowseQueryState = ReturnType<typeof useBrowseQuery>;

export const BrowseQueryContext = createContext<BrowseQueryState | null>(null);

/**
 * The page's one browse query, shared by the top bar (city, date range), the filter
 * panel and the results.
 */
export function useBrowseQueryContext(): BrowseQueryState {
  const state = useContext(BrowseQueryContext);
  if (state === null) throw new Error("useBrowseQueryContext outside BrowseQueryProvider");
  return state;
}
