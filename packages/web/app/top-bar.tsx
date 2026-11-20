import Link from "next/link";
import type { SearchCatalog } from "@fanout/shared";
import { CitySelect } from "./_browse/city-select";
import { DateRangeSelect } from "./_browse/date-range-select";
import { TopSearch } from "./_browse/top-search";
import { SAMPLE_BAND_SPECS, SAMPLE_GENRES, SAMPLE_VENUES } from "@/sample-data";

/** Everything the top-bar search looks through. */
const SEARCH_CATALOG: SearchCatalog = {
  bands: SAMPLE_BAND_SPECS.map((spec) => spec.band),
  genres: Object.values(SAMPLE_GENRES),
  venues: SAMPLE_VENUES,
};

const control =
  "h-10 border border-bone/40 bg-ink px-3 text-bone focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-process";

/** Logo, search, city and date-range selects, sign-in. Sign-in not wired up yet. */
export function TopBar() {
  return (
    <header className="flex flex-wrap items-center gap-x-4 gap-y-3 border-b border-bone/20 px-4 py-3 md:px-6">
      <Link
        href="/"
        className="font-display text-3xl leading-none font-extrabold tracking-wide uppercase"
      >
        Fanout
      </Link>

      <TopSearch catalog={SEARCH_CATALOG} className={control} />

      <CitySelect className={control} />
      <DateRangeSelect className={control} />

      <Link
        href="/sign-in"
        prefetch={false}
        className="ml-auto font-semibold underline-offset-4 hover:underline"
      >
        Sign in
      </Link>
    </header>
  );
}
