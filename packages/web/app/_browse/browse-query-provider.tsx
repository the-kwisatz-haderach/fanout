"use client";

import type { ReactNode } from "react";
import type { BrowseQuery } from "@fanout/shared";
import { BrowseQueryContext, useBrowseQueryState } from "./use-browse-query";

/** Shares one browse query across the whole page: top bar, filter panel and results. */
export function BrowseQueryProvider({
  initialQuery,
  children,
}: {
  initialQuery: BrowseQuery;
  children: ReactNode;
}) {
  const state = useBrowseQueryState(initialQuery);
  return <BrowseQueryContext value={state}>{children}</BrowseQueryContext>;
}
