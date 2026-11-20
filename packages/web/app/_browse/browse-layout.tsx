"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";

/** Tailwind's `md` breakpoint: at and above it the panel sits beside the results. */
const DESKTOP = "(min-width: 48rem)";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

/**
 * The yellow filter panel beside the main results area. Shared by the live page and
 * its loading fallback so nothing jumps when results arrive.
 *
 * Below the desktop breakpoint the panel collapses into a yellow bar summarising the
 * active filters; tapping it opens a full-screen sheet. The sheet shows the very same
 * `panel` controls: they render in exactly one place at a time (the sheet while it's
 * open, else the side panel), so there are no duplicate controls or ids.
 */
export function BrowseLayout({
  panel,
  summary,
  results,
}: {
  panel?: ReactNode;
  /** Short phrases for the active filters, shown on the phone bar. Absent while loading. */
  summary?: readonly string[];
  results: ReactNode;
}) {
  const id = useId();
  const [sheetOpen, setSheetOpen] = useState(false);
  const sheetRef = useRef<HTMLDialogElement>(null);
  const barRef = useRef<HTMLButtonElement>(null);
  const sheetBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sheetOpen) return;
    sheetRef.current?.showModal();
    // Each opening starts at the top, not where the last one was scrolled to (only
    // possible once the dialog is shown).
    sheetBodyRef.current?.scrollTo(0, 0);
  }, [sheetOpen]);

  // If the screen grows to desktop while the sheet is open, the side panel takes over.
  useEffect(() => {
    if (!sheetOpen) return;
    const desktop = window.matchMedia(DESKTOP);
    const onChange = () => desktop.matches && sheetRef.current?.close();
    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, [sheetOpen]);

  function onSheetClose() {
    setSheetOpen(false);
    barRef.current?.focus();
  }

  return (
    <>
      <div data-filter-bar className="bg-process text-ink md:hidden">
        <button
          ref={barRef}
          type="button"
          onClick={() => setSheetOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={sheetOpen}
          disabled={panel === undefined}
          className={`flex min-h-14 w-full items-center gap-3 px-4 py-2 text-left ${focusRing} focus-visible:-outline-offset-4`}
        >
          <span className="font-display text-2xl leading-none font-extrabold tracking-wide uppercase">
            Filters
          </span>
          <span className="min-w-0 flex-1 text-sm leading-snug font-semibold text-pretty">
            {summary ? (
              <>
                <span className="sr-only">: </span>
                {summary.join(" · ")}
              </>
            ) : (
              <span aria-hidden className="block h-4 w-32 animate-pulse bg-ink/15 motion-reduce:animate-none" />
            )}
          </span>
          <span className="shrink-0 border-2 border-ink px-2 py-0.5 text-sm font-bold uppercase">
            Edit
          </span>
        </button>
      </div>

      <dialog
        ref={sheetRef}
        aria-labelledby={`${id}-sheet-heading`}
        onClose={onSheetClose}
        className="m-0 h-dvh max-h-none w-full max-w-none overscroll-contain bg-process p-0 text-ink backdrop:bg-ink/70 open:flex open:flex-col md:hidden"
      >
        <div className="flex items-center justify-between gap-4 border-b-2 border-ink px-4 py-3">
          <h2
            id={`${id}-sheet-heading`}
            className="font-display text-3xl leading-none font-extrabold tracking-wide uppercase"
          >
            Filters
          </h2>
          <button
            type="button"
            onClick={() => sheetRef.current?.close()}
            className={`flex min-h-10 items-center gap-2 px-2 font-bold uppercase ${focusRing}`}
          >
            Close
            <span aria-hidden className="text-2xl leading-none">
              ×
            </span>
          </button>
        </div>
        <div
          ref={sheetBodyRef}
          className="flex-1 space-y-8 overflow-y-auto overscroll-contain p-6"
        >
          {sheetOpen && panel}
        </div>
        <div className="border-t-2 border-ink p-4">
          <button
            type="button"
            onClick={() => sheetRef.current?.close()}
            className={`h-12 w-full bg-ink font-display text-xl font-extrabold tracking-wide text-process uppercase ${focusRing}`}
          >
            Show results
          </button>
        </div>
      </dialog>

      <aside
        aria-label="Filters"
        className="hidden shrink-0 space-y-8 bg-process p-6 text-ink md:block md:w-72"
      >
        {!sheetOpen && panel}
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
