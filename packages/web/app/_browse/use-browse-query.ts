import { useMemo, useSyncExternalStore } from "react";
import { DEFAULT_BROWSE_QUERY, type BrowseQuery } from "@fanout/shared";
import { DEFAULT_CITY_ID } from "@/sample-data";
import { savedBandIds } from "./device-store";

/** The query the page opens with, before the visitor changes anything. */
const STARTER_QUERY: BrowseQuery = {
  ...DEFAULT_BROWSE_QUERY,
  cityId: DEFAULT_CITY_ID,
};

export interface BrowseQueryState {
  /** The visitor's query, or `null` until their saved choices are read (on the server). */
  query: BrowseQuery | null;
  setBandIds: (bandIds: string[]) => void;
}

const notReadYet = () => null;

/** The visitor's browse query, one setter per field. Saved fields persist on the device. */
export function useBrowseQuery(): BrowseQueryState {
  const bandIds = useSyncExternalStore(savedBandIds.subscribe, savedBandIds.read, notReadYet);

  const query = useMemo(
    () => (bandIds === null ? null : { ...STARTER_QUERY, bandIds }),
    [bandIds],
  );

  return { query, setBandIds: savedBandIds.write };
}
