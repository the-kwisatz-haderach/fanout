"use client";

import { useState } from "react";
import { clearFilters, type BrowseQuery, type Grouping } from "@fanout/shared";

/**
 * The visitor's BrowseQuery as client state: one setter per field, plus
 * `clearFilters`, which puts every filter back to `defaults` but keeps the bands.
 */
export function useBrowseQuery(defaults: BrowseQuery) {
  const [query, setQuery] = useState(defaults);

  return {
    query,
    setGenreIds: (genreIds: string[]) => setQuery((q) => ({ ...q, genreIds })),
    setGrouping: (grouping: Grouping) => setQuery((q) => ({ ...q, grouping })),
    clearFilters: () => setQuery((q) => clearFilters(q, defaults)),
  };
}
