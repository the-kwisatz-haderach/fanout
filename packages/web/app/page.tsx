import { Suspense } from "react";
import { BrowseQueryProvider } from "./_browse/browse-query-provider";
import { BrowseResults } from "./_browse/browse-results";
import { NearMeToggle } from "./_browse/panel/near-me-toggle";
import { ResultsPlaceholder } from "./_browse/results-placeholder";
import { STARTER_QUERY } from "./_browse/starter-query";
import { TopBar } from "./top-bar";

export default function Home() {
  return (
    <BrowseQueryProvider initialQuery={STARTER_QUERY}>
      <TopBar />
      <div className="flex flex-1 flex-col md:flex-row">
        <aside
          aria-label="Filters"
          className="flex shrink-0 flex-col gap-6 bg-process p-6 text-ink md:w-72"
        >
          <NearMeToggle />
        </aside>
        <main className="min-w-0 flex-1 p-4 md:p-6">
          <p className="mb-6 inline-block border border-bone/60 px-2 py-1 text-xs font-semibold tracking-widest uppercase">
            Sample data
            <span className="sr-only">
              : all bands, venues and counts are fictional
            </span>
          </p>
          <Suspense fallback={<ResultsPlaceholder />}>
            <BrowseResults />
          </Suspense>
        </main>
      </div>
    </BrowseQueryProvider>
  );
}
