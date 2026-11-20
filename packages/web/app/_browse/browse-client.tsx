"use client";

import { browse, type Concert } from "@fanout/shared";
import { cityName } from "./cities";
import { BandColumns } from "./band-columns";
import { useBrowseQuery } from "./use-browse-query";

/** Renders whatever the browse module returns for the visitor's current query. */
export function BrowseClient({
  concerts,
  today,
}: {
  concerts: readonly Concert[];
  today: string;
}) {
  const { query } = useBrowseQuery();
  const result = browse(concerts, query, { today });

  return <BandColumns bands={result.bands} cityName={cityName(query.cityId)} />;
}
