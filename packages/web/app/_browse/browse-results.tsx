import { connection } from "next/server";
import { sampleConcerts } from "@/sample-data";
import { BrowseClient } from "./browse-client";

/**
 * Loads the sample concerts (dated from today, so per request) and hands them to the
 * client, which browses them with the visitor's query. Holds no browse logic of its own.
 */
export async function BrowseResults() {
  await connection();
  const today = new Date().toISOString().slice(0, 10);

  return <BrowseClient concerts={sampleConcerts(today)} today={today} />;
}
