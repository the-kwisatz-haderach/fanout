import type { BandGroup } from "@fanout/shared";
import { BandColumn } from "./band-column";
import { ColumnGrid } from "./column-grid";

/** The by-band result: one column per band, in the order the browse module gives. */
export function BandColumns({
  bands,
  cityName,
}: {
  bands: readonly BandGroup[];
  /** The selected city, or `null` for any city. */
  cityName: string | null;
}) {
  return (
    <ColumnGrid>
      {bands.map((group, index) => (
        <BandColumn key={group.band.id} group={group} index={index} cityName={cityName} />
      ))}
    </ColumnGrid>
  );
}
