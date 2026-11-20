"use client";

import { useMemo } from "react";
import { browse, type Band, type BrowseQuery, type Concert, type Genre } from "@fanout/shared";
import { BandColumns } from "./band-columns";
import { BrowseLayout } from "./browse-layout";
import { EmptyResult } from "./empty-result";
import { GenreFilter } from "./panel/genre-filter";
import { YourBands } from "./panel/your-bands";
import { PopularHeading } from "./popular-heading";
import { ResultsPlaceholder } from "./results-placeholder";
import { useBrowseQuery } from "./use-browse-query";

/**
 * Holds the visitor's query, runs it through the browse module and renders the
 * panel and results. Holds no browse logic of its own.
 */
export function BrowseClient({
  concerts,
  bands,
  genres,
  defaultQuery,
}: {
  concerts: readonly Concert[];
  bands: readonly Band[];
  genres: readonly Genre[];
  defaultQuery: BrowseQuery;
}) {
  const { query, setBandIds, setGenreIds, clearFilters } = useBrowseQuery(defaultQuery);
  const result = useMemo(() => (query === null ? null : browse(concerts, query)), [concerts, query]);

  return (
    <BrowseLayout
      panel={
        <>
          <YourBands bands={bands} chosenIds={query?.bandIds ?? null} onChange={setBandIds} />
          <GenreFilter
            genres={genres}
            selected={(query ?? defaultQuery).genreIds}
            onChange={setGenreIds}
          />
        </>
      }
      results={
        result === null ? (
          <ResultsPlaceholder />
        ) : result.empty ? (
          <EmptyResult reason={result.empty} onClearFilters={clearFilters} />
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
