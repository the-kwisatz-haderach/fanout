"use client";

import { useRef } from "react";
import { browse, type BrowseQuery, type BrowseResult, type Concert } from "@fanout/shared";
import { BandColumns } from "./band-columns";
import { DateRangeBar } from "./date-range-bar";
import { DayColumns } from "./day-columns";
import { GroupingControl } from "./grouping-control";
import { useBrowseQuery } from "./use-browse-query";
import { useDatesInView } from "./use-dates-in-view";

/**
 * Holds the visitor's query and renders whatever the browse module returns for it.
 * Holds no browse logic of its own.
 */
export function BrowseClient({
  concerts,
  initialQuery,
}: {
  concerts: readonly Concert[];
  initialQuery: BrowseQuery;
}) {
  const { query, setGrouping } = useBrowseQuery(initialQuery);
  const result = browse(concerts, query);
  const resultsRef = useRef<HTMLDivElement>(null);
  const inView = useDatesInView(resultsRef, result);

  return (
    <>
      <DateRangeBar span={inView ?? result.span}>
        <GroupingControl value={query.grouping} onChange={setGrouping} />
      </DateRangeBar>
      <div ref={resultsRef}>
        <Results result={result} />
      </div>
    </>
  );
}

function Results({ result }: { result: BrowseResult }) {
  return result.grouping === "date" ? (
    <DayColumns days={result.days} />
  ) : (
    <BandColumns bands={result.bands} />
  );
}
