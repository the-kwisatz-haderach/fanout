import { connection } from "next/server";
import { DEFAULT_BROWSE_QUERY, type BrowseQuery } from "@fanout/shared";
import {
  DEFAULT_CITY_ID,
  SAMPLE_GENRES,
  sampleConcerts,
  STARTER_BAND_IDS,
} from "@/sample-data";
import { BrowseClient } from "./browse-client";

/**
 * The query the page opens with, before the visitor changes anything. "Clear filters"
 * returns every filter to these values.
 */
const STARTER_QUERY: BrowseQuery = {
  ...DEFAULT_BROWSE_QUERY,
  bandIds: [...STARTER_BAND_IDS],
  cityId: DEFAULT_CITY_ID,
};

/**
 * Loads the sample concerts (dated from today, so per request) and hands them to the
 * client, which runs the visitor's query through the browse module.
 */
export async function BrowseResults() {
  await connection();
  const today = new Date().toISOString().slice(0, 10);

  return (
    <BrowseClient
      concerts={sampleConcerts(today)}
      genres={Object.values(SAMPLE_GENRES)}
      defaultQuery={STARTER_QUERY}
    />
  );
}
