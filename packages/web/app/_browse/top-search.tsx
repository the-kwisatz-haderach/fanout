"use client";

import { useId, useMemo, useState, type KeyboardEvent } from "react";
import { flushSync } from "react-dom";
import {
  bandShownAnnouncement,
  plural,
  searchAction,
  searchOptions,
  topSearch,
  venueLabel,
  type SearchCatalog,
  type SearchOption,
} from "@fanout/shared";
import { useBrowseQueryContext } from "./use-browse-query";

const GROUPS = [
  { kind: "band", heading: "Bands" },
  { kind: "genre", heading: "Genres" },
  { kind: "venue", heading: "Venues" },
] as const;

/**
 * The top-bar search: a combobox listing matching bands, genres and venues, grouped
 * by kind. Choosing a band adds it (or scrolls to its column if already yours),
 * a genre checks that genre filter, a venue filters to that venue's dates.
 */
export function TopSearch({ catalog, className }: { catalog: SearchCatalog; className: string }) {
  const id = useId();
  const { query, setBandIds, setGenreIds, setVenueId, setGrouping } = useBrowseQueryContext();
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [announcement, setAnnouncement] = useState("");

  const result = useMemo(() => topSearch(catalog, text), [catalog, text]);
  const options = searchOptions(result);
  const showList = open && text.trim() !== "";
  const activeOption = showList ? options[active] : undefined;
  const optionId = (option: SearchOption) => `${id}-${option.kind}-${option.item.id}`;

  function close() {
    setText("");
    setOpen(false);
    setActive(0);
  }

  /** Carries out what the browse module decides choosing the option does. */
  function choose(option: SearchOption) {
    close();
    const action = searchAction(option, query);
    switch (action.kind) {
      case "filter-genre":
        setGenreIds(action.genreIds);
        setAnnouncement(action.announcement);
        break;
      case "filter-venue":
        setVenueId(action.venueId);
        setAnnouncement(action.announcement);
        break;
      case "show-band": {
        // Commit synchronously so the band's column exists before scrolling to it.
        flushSync(() => {
          if (action.add) setBandIds(action.bandIds);
          if (query.grouping !== "band") setGrouping("band");
        });
        setAnnouncement(bandShownAnnouncement(action, scrollToBand(action.band.id)));
        break;
      }
    }
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!showList) return setOpen(true);
      if (options.length === 0) return;
      const step = event.key === "ArrowDown" ? 1 : -1;
      setActive((i) => (i + step + options.length) % options.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (activeOption) choose(activeOption);
    } else if (event.key === "Escape") {
      if (showList) event.preventDefault();
      close();
    }
  }

  return (
    <div
      role="search"
      className="relative order-last w-full md:order-none md:w-auto md:max-w-md md:flex-1"
    >
      <label htmlFor={`${id}-input`} className="sr-only">
        Search bands, genres or venues
      </label>
      <input
        id={`${id}-input`}
        type="text"
        role="combobox"
        autoComplete="off"
        aria-autocomplete="list"
        aria-expanded={showList}
        aria-controls={`${id}-list`}
        aria-activedescendant={activeOption ? optionId(activeOption) : undefined}
        aria-describedby={`${id}-status`}
        value={text}
        onChange={(event) => {
          setText(event.target.value);
          setOpen(true);
          setActive(0);
        }}
        onKeyDown={onKeyDown}
        onBlur={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        placeholder="Search bands, genres or venues"
        className={`${className} w-full placeholder:text-bone/60`}
      />
      <p id={`${id}-status`} role="status" className="sr-only">
        {showList ? listStatus(options.length) : announcement}
      </p>

      <div
        id={`${id}-list`}
        role="listbox"
        aria-label="Search results"
        hidden={!showList}
        className="absolute inset-x-0 top-full z-20 mt-1 max-h-[70vh] overflow-y-auto border-2 border-ink bg-process text-ink shadow-[4px_4px_0_0_#1C1C1E]"
      >
        {options.length === 0 ? (
          <p className="px-3 py-3 font-semibold">No matches for “{text.trim()}”.</p>
        ) : (
          GROUPS.map(({ kind, heading }) => {
            const inGroup = options.filter((option) => option.kind === kind);
            if (inGroup.length === 0) return null;
            return (
              <div key={kind} role="group" aria-labelledby={`${id}-${kind}-heading`}>
                <p
                  id={`${id}-${kind}-heading`}
                  role="presentation"
                  className="border-t-2 border-ink px-3 pt-2 pb-1 text-xs font-bold tracking-widest uppercase first:border-t-0"
                >
                  {heading}
                </p>
                {inGroup.map((option) => {
                  const isActive = option === activeOption;
                  return (
                    <div
                      key={option.item.id}
                      id={optionId(option)}
                      role="option"
                      aria-selected={isActive}
                      // Keep focus in the input so the list stays open.
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => choose(option)}
                      onMouseMove={() => setActive(options.indexOf(option))}
                      className={`flex cursor-pointer items-baseline justify-between gap-3 px-3 py-2 font-semibold ${
                        isActive ? "bg-ink text-process" : ""
                      }`}
                    >
                      <span className="min-w-0 break-words">{optionLabel(option)}</span>
                      <span className="shrink-0 text-xs font-bold tracking-wide uppercase">
                        {searchAction(option, query).label}
                      </span>
                    </div>
                  );
                })}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

function optionLabel(option: SearchOption): string {
  return option.kind === "venue" ? venueLabel(option.item) : option.item.name;
}

function listStatus(count: number): string {
  if (count === 0) return "No matches.";
  return `${plural(count, "match", "matches")}. Use the arrow keys to choose, Enter to select.`;
}

/** Scrolls to a band's column and moves focus to its heading. False if it isn't shown. */
function scrollToBand(bandId: string): boolean {
  const heading = document.getElementById(`band-${bandId}`);
  if (!heading) return false;
  heading.setAttribute("tabindex", "-1");
  heading.focus({ preventScroll: true });
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  heading.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  return true;
}
