import type { EmptyReason } from "@fanout/shared";

const MESSAGES: Record<EmptyReason, { heading: string; body: string }> = {
  "no-bands": {
    heading: "No dates to show",
    body: "None of your bands have upcoming dates. Add more bands in the filter panel.",
  },
  "filters-too-narrow": {
    heading: "Nothing matches",
    body: "Your filters leave no dates for your bands. Clear them to see every date again; your bands stay.",
  },
};

/** The main area when the browse module returns nothing, with the reason it gives. */
export function EmptyResult({
  reason,
  onClearFilters,
}: {
  reason: EmptyReason;
  onClearFilters: () => void;
}) {
  const { heading, body } = MESSAGES[reason];

  return (
    <section role="status" className="max-w-md border-t-4 border-bone pt-3">
      <h2 className="font-display text-4xl leading-[0.95] font-extrabold uppercase">
        {heading}
      </h2>
      <p className="mt-3 text-bone/80">{body}</p>
      {reason === "filters-too-narrow" && (
        <button
          type="button"
          onClick={onClearFilters}
          className="mt-6 h-11 bg-process px-5 font-display text-xl font-extrabold tracking-wide text-ink uppercase hover:bg-bone focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-process"
        >
          Clear filters
        </button>
      )}
    </section>
  );
}
