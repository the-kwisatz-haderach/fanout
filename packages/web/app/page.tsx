import { Suspense } from "react";
import { BrowseResults } from "./_browse/browse-results";
import { DateRangeBar } from "./_browse/date-range-bar";
import { ResultsPlaceholder } from "./_browse/results-placeholder";
import { TopBar } from "./top-bar";

export default function Home() {
  return (
    <>
      <TopBar />
      <div className="flex flex-1 flex-col md:flex-row">
        <aside
          aria-label="Filters"
          className="shrink-0 bg-process p-6 text-ink md:w-72"
        />
        <main className="min-w-0 flex-1 p-4 md:p-6">
          <p className="mb-6 inline-block border border-bone/60 px-2 py-1 text-xs font-semibold tracking-widest uppercase">
            Sample data
            <span className="sr-only">
              : all bands, venues and counts are fictional
            </span>
          </p>
          <Suspense
            fallback={
              <>
                <DateRangeBar span={undefined} />
                <ResultsPlaceholder />
              </>
            }
          >
            <BrowseResults />
          </Suspense>
        </main>
      </div>
    </>
  );
}
