/** Shown above popular bands, which stand in until the visitor adds their own. */
export function PopularHeading() {
  return (
    <header className="mb-8">
      <h2 className="font-display text-2xl leading-none font-extrabold tracking-wide uppercase">
        Popular right now
      </h2>
      <p className="mt-2 text-bone/70">Add your own bands in the filters to see their dates instead.</p>
    </header>
  );
}
