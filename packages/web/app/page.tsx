import { Suspense } from "react";
import { BrowseLayout } from "./_browse/browse-layout";
import { BrowseResults } from "./_browse/browse-results";
import { ResultsPlaceholder } from "./_browse/results-placeholder";
import { TopBar } from "./top-bar";

export default function Home() {
  return (
    <>
      <TopBar />
      <div className="flex flex-1 flex-col md:flex-row">
        <Suspense fallback={<BrowseLayout results={<ResultsPlaceholder />} />}>
          <BrowseResults />
        </Suspense>
      </div>
    </>
  );
}
