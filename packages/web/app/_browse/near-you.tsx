/*
 * The "near you" treatment. Pink (#FF0B62) is about 4.4:1 on ink, so it is used only
 * for large date type; small labels stay bone with a pink marker, and "near you" is
 * always said in words, never by colour alone.
 */

/** Colour for a row's large lead type: pink when near you, quieter otherwise. */
export function nearLeadClass(near: boolean): string {
  return near ? "text-pink" : "text-bone/60";
}

/** Small "Near you" label: bone text after a pink marker. */
export function NearYouLabel() {
  return (
    <span className="mt-1 flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase">
      <span aria-hidden className="size-2 shrink-0 bg-pink" />
      Near you
    </span>
  );
}

/** Column note for a band with no dates near the selected city. */
export function NoDatesNear({ cityName }: { cityName: string }) {
  return (
    <p className="mt-2 font-semibold uppercase tracking-wide text-bone/60">
      No dates near {cityName}
    </p>
  );
}
