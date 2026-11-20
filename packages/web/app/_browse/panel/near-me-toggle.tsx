/** The "only dates near me" toggle: hides dates that aren't near the visitor's city. */
export function NearMeToggle({
  checked,
  onChange,
  noCity,
}: {
  checked: boolean;
  onChange: (nearMeOnly: boolean) => void;
  /** No city is selected, so nothing is near and the toggle changes nothing. */
  noCity: boolean;
}) {
  return (
    <label className="flex min-h-8 cursor-pointer items-start gap-3 font-semibold">
      <input
        type="checkbox"
        name="near-me-only"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        aria-describedby={noCity ? "near-me-no-city" : undefined}
        className="mt-0.5 size-5 shrink-0 accent-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      />
      <span>
        Only dates near me
        {noCity && (
          <span id="near-me-no-city" className="block text-sm font-normal">
            Choose a city to use this.
          </span>
        )}
      </span>
    </label>
  );
}
