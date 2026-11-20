"use client";

import { useRef } from "react";
import {
  browse,
  type BrowseQuery,
  type BrowseResult,
  type Concert,
  type Genre,
} from "@fanout/shared";
import { BandColumns } from "./band-columns";
import { BrowseLayout } from "./browse-layout";
import { DateRangeBar } from "./date-range-bar";
import { DayColumns } from "./day-columns";
import { EmptyResult } from "./empty-result";
import { GroupingControl } from "./grouping-control";
import { GenreFilter } from "./panel/genre-filter";
import { useBrowseQuery } from "./use-browse-query";
import { useDatesInView } from "./use-dates-in-view";

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
  const { query, setGenreIds, setGrouping, clearFilters } = useBrowseQuery(defaultQuery);
  const result = browse(concerts, query);
  const resultsRef = useRef<HTMLDivElement>(null);
  const inView = useDatesInView(resultsRef, result);

  return (
    <BrowseLayout
      panel={<GenreFilter genres={genres} selected={query.genreIds} onChange={setGenreIds} />}
      results={
        <>
          <DateRangeBar span={inView ?? result.span}>
            <GroupingControl value={query.grouping} onChange={setGrouping} />
          </DateRangeBar>
          <div ref={resultsRef}>
            {result.empty ? (
              <EmptyResult reason={result.empty} onClearFilters={clearFilters} />
            ) : (
              <Results result={result} />
            )}
          </div>
        </>
      }
    />
  );
}

function Results({ result }: { result: BrowseResult }) {
  return result.grouping === "date" ? (
    <DayColumns days={result.days} />
  ) : (
    <BandColumns bands={result.bands} />
  );
}
