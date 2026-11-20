import { DEFAULT_BROWSE_QUERY, type BrowseQuery } from "@fanout/shared";
import { DEFAULT_CITY_ID, STARTER_BAND_IDS } from "@/sample-data";

/**
 * The query the page opens with, before the visitor changes anything. "Clear filters"
 * returns every filter to these values.
 */
export const STARTER_QUERY: BrowseQuery = {
  ...DEFAULT_BROWSE_QUERY,
  bandIds: [...STARTER_BAND_IDS],
  cityId: DEFAULT_CITY_ID,
};
