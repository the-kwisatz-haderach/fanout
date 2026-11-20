import type { ReactNode } from "react";

/**
 * The yellow filter panel beside the main results area. Shared by the live page and
 * its loading fallback so nothing jumps when results arrive.
 */
export function BrowseLayout({ panel, results }: { panel?: ReactNode; results: ReactNode }) {
  return (
    <>
      <aside aria-label="Filters" className="shrink-0 space-y-8 bg-process p-6 text-ink md:w-72">
        {panel}
      </aside>
      <main className="min-w-0 flex-1 p-4 md:p-6">
        <p className="mb-6 inline-block border border-bone/60 px-2 py-1 text-xs font-semibold tracking-widest uppercase">
          Sample data
          <span className="sr-only">: all bands, venues and counts are fictional</span>
        </p>
        {results}
      </main>
    </>
  );
}
