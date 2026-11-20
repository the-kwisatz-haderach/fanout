"use client";

import { useState } from "react";
import type { BrowseQuery, Grouping } from "@fanout/shared";

/** The visitor's browse query, with one setter per field. */
export function useBrowseQuery(initial: BrowseQuery) {
  const [query, setQuery] = useState(initial);

  const setGrouping = (grouping: Grouping) => setQuery((q) => ({ ...q, grouping }));

  return { query, setGrouping };
}
