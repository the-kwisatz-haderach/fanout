"use client";

import { useMemo, useRef } from "react";
import {
  browse,
  type Band,
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
import { YourBands } from "./panel/your-bands";
import { PopularHeading } from "./popular-heading";
import { ResultsPlaceholder } from "./results-placeholder";
import { useBrowseQuery } from "./use-browse-query";
import { useDatesInView } from "./use-dates-in-view";

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
  const { query, setBandIds, setGenreIds, setGrouping, clearFilters } =
    useBrowseQuery(defaultQuery);
  const result = useMemo(() => (query === null ? null : browse(concerts, query)), [concerts, query]);
  const resultsRef = useRef<HTMLDivElement>(null);
  const inView = useDatesInView(resultsRef, result);

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
          // Saved bands are read on the client; until then, the same skeleton as loading.
          <>
            <DateRangeBar span={undefined} />
            <ResultsPlaceholder />
          </>
        ) : (
          <>
            <DateRangeBar span={inView ?? result.span}>
              <GroupingControl value={result.grouping} onChange={setGrouping} />
            </DateRangeBar>
            {result.source === "popular" && <PopularHeading />}
            <div ref={resultsRef}>
              {result.empty ? (
                <EmptyResult reason={result.empty} onClearFilters={clearFilters} />
              ) : (
                <Results result={result} />
              )}
            </div>
          </>
        )
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
