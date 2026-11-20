import type { BandSource, EmptyReason } from "@fanout/shared";

/**
 * Copy for each reason, worded for whose bands were in question: the visitor's own
 * (`yours`) or, with none chosen yet, any band (`popular`).
 */
const MESSAGES: Record<EmptyReason, Record<BandSource, { heading: string; body: string }>> = {
  "no-bands": {
    yours: {
      heading: "No dates to show",
      body: "None of your bands have upcoming dates. Add more bands in the filter panel.",
    },
    popular: {
      heading: "No dates to show",
      body: "You haven't chosen any bands, and there are no upcoming dates to suggest any from yet. Add the bands you love in the filter panel.",
    },
  },
  "filters-too-narrow": {
    yours: {
      heading: "Nothing matches",
      body: "Your filters leave no dates for your bands. Clear them to start over; your bands stay.",
    },
    popular: {
      heading: "Nothing matches",
      body: "Your filters leave no dates to suggest bands from. Clear them to see popular bands again, or add your own bands in the filter panel.",
    },
  },
};

/** The main area when the browse module returns nothing, with the reason it gives. */
export function EmptyResult({
  reason,
  source,
  onClearFilters,
}: {
  reason: EmptyReason;
  source: BandSource;
  onClearFilters: () => void;
}) {
  const { heading, body } = MESSAGES[reason][source];

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
