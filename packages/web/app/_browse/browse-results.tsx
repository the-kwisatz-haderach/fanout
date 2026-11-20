import { connection } from "next/server";
import { browse, DEFAULT_BROWSE_QUERY, type BrowseQuery } from "@fanout/shared";
import { DEFAULT_CITY_ID, sampleConcerts, STARTER_BAND_IDS } from "@/sample-data";
import { BandColumns } from "./band-columns";

/** The query the page opens with, before the visitor changes anything. */
const STARTER_QUERY: BrowseQuery = {
  ...DEFAULT_BROWSE_QUERY,
  bandIds: [...STARTER_BAND_IDS],
  cityId: DEFAULT_CITY_ID,
};

/**
 * Loads the sample concerts (dated from today, so per request) and renders whatever
 * the browse module returns. Holds no browse logic of its own.
 */
export async function BrowseResults() {
  await connection();
  const today = new Date().toISOString().slice(0, 10);
  const result = browse(sampleConcerts(today), STARTER_QUERY);

  return <BandColumns bands={result.bands} />;
}
