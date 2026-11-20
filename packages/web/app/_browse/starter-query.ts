import { DEFAULT_BROWSE_QUERY, type BrowseQuery } from "@fanout/shared";
import { DEFAULT_CITY_ID } from "@/sample-data";

/**
 * The query the page opens with, before the visitor changes anything. "Clear filters"
 * returns every filter to these values. Bands come from the visitor's saved choice.
 */
export const STARTER_QUERY: BrowseQuery = {
  ...DEFAULT_BROWSE_QUERY,
  cityId: DEFAULT_CITY_ID,
};
