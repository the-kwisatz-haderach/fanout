import type { FansTag as FansTagData, FansTagStep } from "@fanout/shared";

/** Type size per step, so busier shows stand out before the number is read. */
const STEP_CLASS: Record<FansTagStep, string> = {
  1: "text-xs px-1.5 py-0.5",
  2: "text-sm px-2 py-0.5",
  3: "text-base px-2 py-1",
  4: "text-xl px-2.5 py-1",
};

/**
 * The fans-going tag: process yellow with black text, both counts in words. Counts
 * only, never faces or names. The separator dot is hidden from screen readers, which
 * hear a comma instead.
 */
export function FansTag({ tag }: { tag: FansTagData | null }) {
  if (!tag) return null;
  return (
    <span
      className={`mt-1.5 inline-block bg-process font-semibold leading-tight text-ink ${STEP_CLASS[tag.step]}`}
    >
      {tag.going} going
      <span aria-hidden> · </span>
      <span className="sr-only">, </span>
      {tag.sharesYourBands} like your bands
    </span>
  );
}
