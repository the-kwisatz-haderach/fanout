"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { BrowseQuery, DateRangeId } from "@fanout/shared";

/** The visitor's browse query and one setter per field. */
export interface BrowseQueryState {
  query: BrowseQuery;
  setCityId: (cityId: string | null) => void;
  setDateRangeId: (dateRangeId: DateRangeId) => void;
  setNearMeOnly: (nearMeOnly: boolean) => void;
}

export const BrowseQueryContext = createContext<BrowseQueryState | null>(null);

/** Holds the query for `BrowseQueryProvider`. */
export function useBrowseQueryState(initialQuery: BrowseQuery): BrowseQueryState {
  const [query, setQuery] = useState(initialQuery);

  return useMemo(() => {
    const set =
      <K extends keyof BrowseQuery>(key: K) =>
      (value: BrowseQuery[K]) =>
        setQuery((current) => ({ ...current, [key]: value }));
    return {
      query,
      setCityId: set("cityId"),
      setDateRangeId: set("dateRangeId"),
      setNearMeOnly: set("nearMeOnly"),
    };
  }, [query]);
}

/** The page's browse query, shared by the top bar, the filter panel and the results. */
export function useBrowseQuery(): BrowseQueryState {
  const state = useContext(BrowseQueryContext);
  if (state === null) throw new Error("useBrowseQuery outside BrowseQueryProvider");
  return state;
}
