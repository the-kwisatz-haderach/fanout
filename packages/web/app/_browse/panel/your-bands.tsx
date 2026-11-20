"use client";

import Link from "next/link";
import { useId, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { searchBands, type Band } from "@fanout/shared";

/** Most search results listed at once. */
const MAX_MATCHES = 8;

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

/**
 * The visitor's bands as removable chips, a search to add more, and a note that
 * they're kept on this device. `chosenIds` is `null` until saved bands are read.
 */
export function YourBands({
  bands,
  chosenIds,
  onChange,
}: {
  bands: readonly Band[];
  chosenIds: readonly string[] | null;
  onChange: (bandIds: string[]) => void;
}) {
  const id = useId();
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const chipsRef = useRef<HTMLUListElement>(null);

  const chosen = chosenIds ?? [];
  const byId = new Map(bands.map((band) => [band.id, band]));
  const chosenBands = chosen.flatMap((bandId) => byId.get(bandId) ?? []);
  const matches = searchBands(bands, text)
    .filter((band) => !chosen.includes(band.id))
    .slice(0, MAX_MATCHES);

  function add(band: Band) {
    onChange([...chosen, band.id]);
    setText("");
    inputRef.current?.focus();
  }

  function remove(index: number) {
    onChange(chosen.filter((_, i) => i !== index));
    // Keep focus in the list: the chip that slides into place, else the one before, else search.
    const chips = chipsRef.current?.querySelectorAll("button");
    const next = chips?.[index + 1] ?? chips?.[index - 1] ?? inputRef.current;
    next?.focus();
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (matches[0]) add(matches[0]);
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") setText("");
  }

  return (
    <section aria-labelledby={`${id}-heading`}>
      <h2
        id={`${id}-heading`}
        className="font-display text-2xl leading-none font-extrabold tracking-wide uppercase"
      >
        Your bands
      </h2>

      {chosenIds !== null && chosen.length === 0 && (
        <p className="mt-2 font-semibold">Add the bands you love to see their upcoming dates.</p>
      )}

      {chosenBands.length > 0 && (
        <ul ref={chipsRef} aria-label="Your bands" className="mt-3 flex flex-wrap gap-2">
          {chosenBands.map((band, index) => (
            <li key={band.id} className="min-w-0">
              <button
                type="button"
                onClick={() => remove(index)}
                aria-label={`Remove ${band.name}`}
                className={`flex max-w-full items-baseline gap-2 bg-ink px-2 py-1 text-left font-display text-lg leading-tight font-semibold text-process uppercase hover:bg-ink/85 ${focusRing}`}
              >
                <span className="min-w-0 break-words">{band.name}</span>
                <span aria-hidden className="font-sans text-base">
                  ×
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={onSubmit} className="mt-4">
        <label htmlFor={`${id}-search`} className="block text-sm font-bold tracking-wide uppercase">
          Add a band
        </label>
        <input
          ref={inputRef}
          id={`${id}-search`}
          type="search"
          autoComplete="off"
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={onKeyDown}
          aria-describedby={`${id}-status`}
          placeholder="Search bands"
          className={`mt-1 h-10 w-full border-2 border-ink bg-transparent px-2 placeholder:text-ink/60 ${focusRing}`}
        />
        <p id={`${id}-status`} role="status" className="sr-only">
          {searchStatus(text, matches)}
        </p>
      </form>

      {text.trim() !== "" && (
        <ul aria-label="Matching bands" className="mt-1 border-2 border-t-0 border-ink">
          {matches.length === 0 ? (
            <li className="px-2 py-2 text-sm">No bands found.</li>
          ) : (
            matches.map((band) => (
              <li key={band.id}>
                <button
                  type="button"
                  onClick={() => add(band)}
                  className="flex w-full items-baseline gap-2 px-2 py-2 text-left font-semibold hover:bg-ink hover:text-process focus-visible:bg-ink focus-visible:text-process focus-visible:outline-none"
                >
                  <span aria-hidden>+</span>
                  <span className="min-w-0 break-words">
                    <span className="sr-only">Add </span>
                    {band.name}
                  </span>
                </button>
              </li>
            ))
          )}
        </ul>
      )}

      <p className="mt-4 text-sm">
        Your bands are saved on this device only.{" "}
        <Link
          href="/sign-in"
          prefetch={false}
          className={`font-bold underline underline-offset-2 ${focusRing}`}
        >
          Sign in to keep them
        </Link>
      </p>
    </section>
  );
}

/** What screen readers hear as the search results change. */
function searchStatus(text: string, matches: readonly Band[]): string {
  const [first] = matches;
  if (text.trim() === "") return "";
  if (!first) return "No bands found";
  const count = `${matches.length} ${matches.length === 1 ? "band" : "bands"} found`;
  return `${count}. Press Enter to add ${first.name}, or Tab to the list.`;
}
