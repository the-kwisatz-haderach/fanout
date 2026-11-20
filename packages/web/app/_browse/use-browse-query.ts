"use client";

import { createContext, useContext, useMemo, useState, useSyncExternalStore } from "react";
import {
  clearFilters,
  restoreFilters,
  savedFiltersOf,
  type BrowseQuery,
  type DateRangeId,
  type Grouping,
} from "@fanout/shared";
import { savedBandIds, savedFilters } from "./device-store";

const notReadYet = () => null;

/**
 * The visitor's BrowseQuery as client state: one setter per field, plus
 * `clearFilters`, which puts every filter back to `defaults` but keeps the bands.
 * Called once, by `BrowseQueryProvider`; components read it with `useBrowseQueryContext`.
 * Bands are saved on the device through `savedBandIds`; they can only be read in the
 * browser, so until then (the server render) `bandIds` is empty and `bandsReady` false.
 * Filters (every query field but bands and grouping) are saved through `savedFilters`
 * on each change and restored on the next visit; `clearFilters` also clears the save.
 */
export function useBrowseQuery(defaults: BrowseQuery) {
  const [state, setState] = useState(defaults);
  const bandIds = useSyncExternalStore(savedBandIds.subscribe, savedBandIds.read, notReadYet);
  const stored = useSyncExternalStore(savedFilters.subscribe, savedFilters.read, notReadYet);

  const query = useMemo(
    () => ({ ...state, ...restoreFilters(stored, defaults), bandIds: bandIds ?? [] }),
    [state, stored, defaults, bandIds],
  );

  /** Applies `update` and saves the resulting filters on the device. */
  const setQuery = (update: (q: BrowseQuery) => BrowseQuery) => {
    const next = update(query);
    setState(next);
    savedFilters.write(savedFiltersOf(next));
  };

  return {
    query,
    bandsReady: bandIds !== null,
    setBandIds: savedBandIds.write,
    setGenreIds: (genreIds: string[]) => setQuery((q) => ({ ...q, genreIds })),
    setCityId: (cityId: string | null) => setQuery((q) => ({ ...q, cityId })),
    setDateRangeId: (dateRangeId: DateRangeId) => setQuery((q) => ({ ...q, dateRangeId })),
    setNearMeOnly: (nearMeOnly: boolean) => setQuery((q) => ({ ...q, nearMeOnly })),
    setFansLikeMeOnly: (fansLikeMeOnly: boolean) => setQuery((q) => ({ ...q, fansLikeMeOnly })),
    setGrouping: (grouping: Grouping) => setQuery((q) => ({ ...q, grouping })),
    setVenueId: (venueId: string | null) => setQuery((q) => ({ ...q, venueId })),
    clearFilters: () => {
      setState((q) => clearFilters(q, defaults));
      savedFilters.write(null);
    },
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
