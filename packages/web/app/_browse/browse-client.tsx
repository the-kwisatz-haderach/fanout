"use client";

import { browse, type BrowseQuery, type Concert, type Genre } from "@fanout/shared";
import { BandColumns } from "./band-columns";
import { BrowseLayout } from "./browse-layout";
import { EmptyResult } from "./empty-result";
import { GenreFilter } from "./panel/genre-filter";
import { useBrowseQuery } from "./use-browse-query";

/**
 * Holds the visitor's query, runs it through the browse module and renders the
 * panel and results. Holds no browse logic of its own.
 */
export function BrowseClient({
  concerts,
  genres,
  defaultQuery,
}: {
  concerts: readonly Concert[];
  genres: readonly Genre[];
  defaultQuery: BrowseQuery;
}) {
  const { query, setGenreIds, clearFilters } = useBrowseQuery(defaultQuery);
  const result = browse(concerts, query);

  return (
    <BrowseLayout
      panel={<GenreFilter genres={genres} selected={query.genreIds} onChange={setGenreIds} />}
      results={
        result.empty ? (
          <EmptyResult reason={result.empty} onClearFilters={clearFilters} />
        ) : (
          <BandColumns bands={result.bands} />
        )
      }
    />
  );
}
