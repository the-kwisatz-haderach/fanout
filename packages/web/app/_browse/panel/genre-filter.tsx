import type { Genre } from "@fanout/shared";

/** Genre checkboxes. None checked means every genre. */
export function GenreFilter({
  genres,
  selected,
  onChange,
}: {
  genres: readonly Genre[];
  selected: readonly string[];
  onChange: (genreIds: string[]) => void;
}) {
  const toggle = (id: string, checked: boolean) =>
    onChange(checked ? [...selected, id] : selected.filter((g) => g !== id));

  return (
    <fieldset>
      <legend className="font-display text-2xl leading-none font-extrabold uppercase">
        Genres
      </legend>
      <ul className="mt-3 space-y-1">
        {genres.map((genre) => (
          <li key={genre.id}>
            <label className="flex min-h-8 cursor-pointer items-center gap-3 font-semibold">
              <input
                type="checkbox"
                checked={selected.includes(genre.id)}
                onChange={(event) => toggle(genre.id, event.target.checked)}
                className="size-5 shrink-0 accent-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              />
              {genre.name}
            </label>
          </li>
        ))}
      </ul>
    </fieldset>
  );
}
