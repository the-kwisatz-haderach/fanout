"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { clearFilters, type BrowseQuery, type Grouping } from "@fanout/shared";
import { savedBandIds } from "./device-store";

const notReadYet = () => null;

/**
 * The visitor's BrowseQuery as client state: one setter per field, plus
 * `clearFilters`, which puts every filter back to `defaults` but keeps the bands.
 * Bands are saved on the device, so `query` is `null` until they can be read
 * (during the server render).
 */
export function useBrowseQuery(defaults: BrowseQuery) {
  const [state, setQuery] = useState(defaults);
  const bandIds = useSyncExternalStore(savedBandIds.subscribe, savedBandIds.read, notReadYet);

  const query = useMemo(
    () => (bandIds === null ? null : { ...state, bandIds }),
    [state, bandIds],
  );

  return {
    query,
    setBandIds: savedBandIds.write,
    setGenreIds: (genreIds: string[]) => setQuery((q) => ({ ...q, genreIds })),
    setGrouping: (grouping: Grouping) => setQuery((q) => ({ ...q, grouping })),
    clearFilters: () => setQuery((q) => clearFilters(q, defaults)),
  };
}
