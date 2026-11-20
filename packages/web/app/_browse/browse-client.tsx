"use client";

import { browse, type Concert, type Genre } from "@fanout/shared";
import { BandColumns } from "./band-columns";
import { BrowseLayout } from "./browse-layout";
import { cityName } from "./cities";
import { EmptyResult } from "./empty-result";
import { GenreFilter } from "./panel/genre-filter";
import { NearMeToggle } from "./panel/near-me-toggle";
import { useBrowseQueryContext } from "./use-browse-query";

/**
 * Reads the visitor's query, runs it through the browse module and renders the
 * panel and results. Holds no browse logic of its own.
 */
export function BrowseClient({
  concerts,
  genres,
  today,
}: {
  concerts: readonly Concert[];
  genres: readonly Genre[];
  /** `YYYY-MM-DD`, from the server, so date ranges count from the same day. */
  today: string;
}) {
  const { query, setGenreIds, setNearMeOnly, clearFilters } = useBrowseQueryContext();
  const result = browse(concerts, query, { today });

  return (
    <BrowseLayout
      panel={
        <>
          <GenreFilter genres={genres} selected={query.genreIds} onChange={setGenreIds} />
          <NearMeToggle
            checked={query.nearMeOnly}
            onChange={setNearMeOnly}
            noCity={query.cityId === null}
          />
        </>
      }
      results={
        result.empty ? (
          <EmptyResult reason={result.empty} onClearFilters={clearFilters} />
        ) : (
          <BandColumns bands={result.bands} cityName={cityName(query.cityId)} />
        )
      }
    />
  );
}
