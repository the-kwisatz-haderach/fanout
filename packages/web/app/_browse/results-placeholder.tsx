import { ColumnGrid } from "./column-grid";

const COLUMNS = 6;
const ROWS = 6;

/** Loading placeholder shaped like band columns, so results replace it in place. */
export function ResultsPlaceholder() {
  return (
    <ColumnGrid busy>
      <p className="sr-only" role="status">
        Loading concerts…
      </p>
      {Array.from({ length: COLUMNS }, (_, column) => (
        <div
          key={column}
          aria-hidden
          className="animate-pulse border-t-4 border-bone/20 pt-3 motion-reduce:animate-none"
        >
          <div className="h-9 w-3/4 bg-bone/10" />
          <div className="mt-3 h-4 w-1/2 bg-bone/10" />
          <div className="mt-3 divide-y divide-bone/15">
            {Array.from({ length: ROWS }, (_, row) => (
              <div key={row} className="grid grid-cols-[7rem_1fr] gap-x-3 py-2">
                <div className="h-6 bg-bone/10" />
                <div className="h-10 bg-bone/10" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </ColumnGrid>
  );
}
