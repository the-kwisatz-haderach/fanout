import Link from "next/link";
import { CitySelect } from "./_browse/city-select";
import { DateRangeSelect } from "./_browse/date-range-select";

const control =
  "h-10 border border-bone/40 bg-ink px-3 text-bone focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-process";

/** Logo, search, city and date-range selects, sign-in. Search and sign-in not wired up yet. */
export function TopBar() {
  return (
    <header className="flex flex-wrap items-center gap-x-4 gap-y-3 border-b border-bone/20 px-4 py-3 md:px-6">
      <Link
        href="/"
        className="font-display text-3xl leading-none font-extrabold tracking-wide uppercase"
      >
        Fanout
      </Link>

      <form role="search" className="order-last w-full md:order-none md:w-auto md:flex-1 md:max-w-md">
        <label htmlFor="search" className="sr-only">
          Search bands, genres or venues
        </label>
        <input
          id="search"
          name="q"
          type="search"
          placeholder="Search bands, genres or venues"
          className={`${control} w-full placeholder:text-bone/60`}
        />
      </form>

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
