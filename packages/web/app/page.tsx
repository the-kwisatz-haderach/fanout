import { Suspense } from "react";
import { BrowseLayout } from "./_browse/browse-layout";
import { BrowseQueryProvider } from "./_browse/browse-query-provider";
import { BrowseResults } from "./_browse/browse-results";
import { DateRangeBar } from "./_browse/date-range-bar";
import { ResultsPlaceholder } from "./_browse/results-placeholder";
import { STARTER_QUERY } from "./_browse/starter-query";
import { TopBar } from "./top-bar";

export default function Home() {
  return (
    <BrowseQueryProvider defaults={STARTER_QUERY}>
      <TopBar />
      <div className="flex flex-1 flex-col md:flex-row">
        <Suspense
          fallback={
            <BrowseLayout
              results={
                <>
                  <DateRangeBar span={undefined} />
                  <ResultsPlaceholder />
                </>
              }
            />
          }
        >
          <BrowseResults />
        </Suspense>
      </div>
    </BrowseQueryProvider>
  );
}
