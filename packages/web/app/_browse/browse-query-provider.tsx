"use client";

import type { ReactNode } from "react";
import type { BrowseQuery } from "@fanout/shared";
import { BrowseQueryContext, useBrowseQuery } from "./use-browse-query";

/**
 * Holds the page's one browse query, so the top bar's selects, the filter panel and
 * the results all read and change the same state. `defaults` is where the page starts
 * and where "Clear filters" returns to.
 */
export function BrowseQueryProvider({
  defaults,
  children,
}: {
  defaults: BrowseQuery;
  children: ReactNode;
}) {
  const state = useBrowseQuery(defaults);
  return <BrowseQueryContext value={state}>{children}</BrowseQueryContext>;
}
