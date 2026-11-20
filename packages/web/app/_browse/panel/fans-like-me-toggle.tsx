/** The "only shows with fans like me" toggle: keeps dates where a going fan shares your bands. */
export function FansLikeMeToggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (fansLikeMeOnly: boolean) => void;
}) {
  return (
    <label className="flex min-h-8 cursor-pointer items-start gap-3 font-semibold">
      <input
        type="checkbox"
        name="fans-like-me-only"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-0.5 size-5 shrink-0 accent-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      />
      <span>Only shows with fans like me</span>
    </label>
  );
}
