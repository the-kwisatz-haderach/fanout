import type { BandGroup } from "@fanout/shared";
import { BandColumn } from "./band-column";
import { ColumnGrid } from "./column-grid";

/** The by-band result: one column per band, in the order the browse module gives. */
export function BandColumns({ bands }: { bands: readonly BandGroup[] }) {
  return (
    <ColumnGrid>
      {bands.map((group, index) => (
        <BandColumn key={group.band.id} group={group} index={index} />
      ))}
    </ColumnGrid>
  );
}
