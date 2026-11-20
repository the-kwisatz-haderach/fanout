"use client";

import { useMemo } from "react";
import { browse, type Band, type Concert } from "@fanout/shared";
import { BandColumns } from "./band-columns";
import { BrowseLayout } from "./browse-layout";
import { YourBands } from "./panel/your-bands";
import { PopularHeading } from "./popular-heading";
import { ResultsPlaceholder } from "./results-placeholder";
import { useBrowseQuery } from "./use-browse-query";

/**
 * Holds the visitor's query, runs it through the browse module and renders the
 * panel and results. No browse logic of its own.
 */
export function BrowseClient({
  concerts,
  bands,
}: {
  concerts: readonly Concert[];
  bands: readonly Band[];
}) {
  const { query, setBandIds } = useBrowseQuery();
  const result = useMemo(() => (query === null ? null : browse(concerts, query)), [concerts, query]);

  return (
    <BrowseLayout
      panel={<YourBands bands={bands} chosenIds={query?.bandIds ?? null} onChange={setBandIds} />}
      results={
        result === null ? (
          <ResultsPlaceholder />
        ) : (
          <>
            {result.source === "popular" && <PopularHeading />}
            <BandColumns bands={result.bands} />
          </>
        )
      }
    />
  );
}
