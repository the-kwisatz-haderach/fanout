"use client";

import { useRef } from "react";
import { browse, type BrowseResult, type Concert, type Genre } from "@fanout/shared";
import { BandColumns } from "./band-columns";
import { BrowseLayout } from "./browse-layout";
import { cityName } from "./cities";
import { DateRangeBar } from "./date-range-bar";
import { DayColumns } from "./day-columns";
import { EmptyResult } from "./empty-result";
import { GroupingControl } from "./grouping-control";
import { GenreFilter } from "./panel/genre-filter";
import { FansLikeMeToggle } from "./panel/fans-like-me-toggle";
import { NearMeToggle } from "./panel/near-me-toggle";
import { useBrowseQueryContext } from "./use-browse-query";
import { useDatesInView } from "./use-dates-in-view";

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
  const { query, setGenreIds, setNearMeOnly, setFansLikeMeOnly, setGrouping, clearFilters } =
    useBrowseQueryContext();
  const result = browse(concerts, query, { today });
  const resultsRef = useRef<HTMLDivElement>(null);
  const inView = useDatesInView(resultsRef, result);

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
          <FansLikeMeToggle checked={query.fansLikeMeOnly} onChange={setFansLikeMeOnly} />
        </>
      }
      results={
        <>
          <DateRangeBar span={inView ?? result.span}>
            <GroupingControl value={query.grouping} onChange={setGrouping} />
          </DateRangeBar>
          <div ref={resultsRef}>
            {result.empty ? (
              <EmptyResult reason={result.empty} onClearFilters={clearFilters} />
            ) : (
              <Results result={result} cityName={cityName(query.cityId)} />
            )}
          </div>
        </>
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
