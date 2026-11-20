import Link from "next/link";
import { DATE_RANGES, DEFAULT_DATE_RANGE_ID } from "@fanout/shared";

const control =
  "h-10 border border-bone/40 bg-ink px-3 text-bone focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-process";

/** Logo, search, city and date-range selects, sign-in. Not wired up yet. */
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

      <label className="flex items-center gap-2">
        <span className="sr-only">City</span>
        <select name="city" defaultValue="" className={control}>
          <option value="">Any city</option>
        </select>
      </label>

      <label className="flex items-center gap-2">
        <span className="sr-only">Date range</span>
        <select name="range" defaultValue={DEFAULT_DATE_RANGE_ID} className={control}>
          {DATE_RANGES.map((range) => (
            <option key={range.id} value={range.id}>
              {range.label}
            </option>
          ))}
        </select>
      </label>

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
