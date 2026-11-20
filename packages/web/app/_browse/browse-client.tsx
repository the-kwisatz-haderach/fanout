"use client";

import { useMemo, useRef } from "react";
import {
  browse,
  type Band,
  type BrowseResult,
  type Concert,
  type Genre,
  type Venue,
} from "@fanout/shared";
import { BandColumns } from "./band-columns";
import { BrowseLayout } from "./browse-layout";
import { cityName } from "./cities";
import { DateRangeBar } from "./date-range-bar";
import { DayColumns } from "./day-columns";
import { EmptyResult } from "./empty-result";
import { filterSummary } from "./filter-summary";
import { GroupingControl } from "./grouping-control";
import { GenreFilter } from "./panel/genre-filter";
import { FansLikeMeToggle } from "./panel/fans-like-me-toggle";
import { NearMeToggle } from "./panel/near-me-toggle";
import { VenueFilter } from "./panel/venue-filter";
import { YourBands } from "./panel/your-bands";
import { PopularHeading } from "./popular-heading";
import { ResultsPlaceholder } from "./results-placeholder";
import { useBrowseQueryContext } from "./use-browse-query";
import { useDatesInView } from "./use-dates-in-view";

/**
 * Reads the visitor's query, runs it through the browse module and renders the
 * panel and results. Holds no browse logic of its own.
 */
export function BrowseClient({
  concerts,
  bands,
  genres,
  venues,
  today,
}: {
  concerts: readonly Concert[];
  bands: readonly Band[];
  genres: readonly Genre[];
  /** Every venue, to name the one chosen from the top-bar search. */
  venues: readonly Venue[];
  /** `YYYY-MM-DD`, from the server, so date ranges count from the same day. */
  today: string;
}) {
  const {
    query,
    bandsReady,
    setBandIds,
    setGenreIds,
    setNearMeOnly,
    setFansLikeMeOnly,
    setGrouping,
    setVenueId,
    clearFilters,
  } = useBrowseQueryContext();
  const result = useMemo(() => browse(concerts, query, { today }), [concerts, query, today]);
  const resultsRef = useRef<HTMLDivElement>(null);
  const inView = useDatesInView(resultsRef, result);

  return (
    <BrowseLayout
      summary={bandsReady ? filterSummary(query, { genres, venues }) : undefined}
      panel={
        <>
          <YourBands
            bands={bands}
            chosenIds={bandsReady ? query.bandIds : null}
            onChange={setBandIds}
          />
          <VenueFilter venues={venues} venueId={query.venueId} onClear={() => setVenueId(null)} />
          <GenreFilter genres={genres} selected={query.genreIds} onChange={setGenreIds} />
          <NearMeToggle
            checked={query.nearMeOnly}
            onChange={setNearMeOnly}
            noCity={query.cityId === null}
          />
          <FansLikeMeToggle checked={query.fansLikeMeOnly} onChange={setFansLikeMeOnly} />
        </>
      }
      results={
        bandsReady ? (
          <>
            <DateRangeBar span={inView ?? result.span}>
              <GroupingControl value={query.grouping} onChange={setGrouping} />
            </DateRangeBar>
            {result.source === "popular" && <PopularHeading />}
            <div ref={resultsRef}>
              {result.empty ? (
                <EmptyResult reason={result.empty} onClearFilters={clearFilters} />
              ) : (
                <Results result={result} cityName={cityName(query.cityId)} />
              )}
            </div>
          </>
        ) : (
          // Saved bands are read in the browser; until then, the same skeleton as loading.
          <>
            <DateRangeBar span={undefined} />
            <ResultsPlaceholder />
          </>
        )
      }
    />
  );
}

function Results({ result, cityName }: { result: BrowseResult; cityName: string | null }) {
  return result.grouping === "date" ? (
    <DayColumns days={result.days} />
  ) : (
    <BandColumns bands={result.bands} cityName={cityName} />
  );
}
