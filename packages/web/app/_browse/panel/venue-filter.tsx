import { findById, venueLabel, type Venue } from "@fanout/shared";

/**
 * The venue chosen from the top-bar search, as a removable chip. Renders nothing
 * when no venue is chosen (or the chosen one is unknown).
 */
export function VenueFilter({
  venues,
  venueId,
  onClear,
}: {
  venues: readonly Venue[];
  venueId: string | null;
  onClear: () => void;
}) {
  const venue = findById(venues, venueId);
  if (!venue) return null;

  return (
    <section aria-labelledby="venue-filter-heading">
      <h2
        id="venue-filter-heading"
        className="font-display text-2xl leading-none font-extrabold tracking-wide uppercase"
      >
        Venue
      </h2>
      <p className="mt-2 text-sm">Only dates at this venue.</p>
      <button
        type="button"
        onClick={onClear}
        aria-label={`Remove venue filter: ${venueLabel(venue)}`}
        className="mt-2 flex max-w-full items-baseline gap-2 bg-ink px-2 py-1 text-left font-display text-lg leading-tight font-semibold text-process uppercase hover:bg-ink/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      >
        <span className="min-w-0 break-words">{venueLabel(venue)}</span>
        <span aria-hidden className="font-sans text-base">
          ×
        </span>
      </button>
    </section>
  );
}
