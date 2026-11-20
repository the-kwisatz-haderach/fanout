import type { Grouping } from "@fanout/shared";

const OPTIONS: readonly { value: Grouping; label: string }[] = [
  { value: "band", label: "By band" },
  { value: "date", label: "By date" },
];

/** "Group: By band / By date", as a native radio group (arrow keys move between options). */
export function GroupingControl({
  value,
  onChange,
}: {
  value: Grouping;
  onChange: (grouping: Grouping) => void;
}) {
  return (
    <fieldset className="flex items-center gap-3">
      <legend className="float-left mr-3 text-sm font-semibold tracking-widest uppercase">
        Group
      </legend>
      <div className="flex border border-bone/40">
        {OPTIONS.map((option) => (
          <label
            key={option.value}
            className="cursor-pointer px-3 py-2 text-sm font-semibold tracking-wide uppercase has-checked:bg-bone has-checked:text-ink has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-process"
          >
            <input
              type="radio"
              name="grouping"
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
