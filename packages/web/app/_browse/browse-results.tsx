import { connection } from "next/server";
import { SAMPLE_BAND_SPECS, SAMPLE_GENRES, sampleConcerts } from "@/sample-data";
import { BrowseClient } from "./browse-client";

/** Every band the visitor can search for and add. */
const ALL_BANDS = SAMPLE_BAND_SPECS.map((spec) => spec.band);

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
      bands={ALL_BANDS}
      genres={Object.values(SAMPLE_GENRES)}
      today={today}
    />
  );
}
