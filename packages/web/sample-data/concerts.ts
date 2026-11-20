import { addDays, type Concert, type IsoDate, type TicketState } from "@fanout/shared";
import {
  DEFAULT_CITY_ID,
  SAMPLE_BAND_SPECS,
  SAMPLE_VENUES,
  type SampleBandSpec,
} from "./catalog";

/** How far ahead sample tours run, in days from today. */
const TOUR_WINDOW_DAYS = 180;

/**
 * Every sample concert, dated relative to `today` so the data never
 * goes stale. Deterministic: the same `today` always gives the same concerts, and
 * concert ids don't depend on `today`.
 */
export function sampleConcerts(today: IsoDate): Concert[] {
  return SAMPLE_BAND_SPECS.flatMap((spec) => tour(spec, today));
}

function tour(spec: SampleBandSpec, today: IsoDate): Concert[] {
  const random = seededRandom(spec.band.id);
  const venues = spec.skipsDefaultCity
    ? SAMPLE_VENUES.filter((v) => v.city.id !== DEFAULT_CITY_ID)
    : SAMPLE_VENUES;
  const homeVenues = SAMPLE_VENUES.filter((v) => v.city.id === DEFAULT_CITY_ID);

  return pickOffsets(spec.dates, random).map((offset, index) => {
    // Every band that plays the default city does so at least once (its second date).
    const venue =
      !spec.skipsDefaultCity && index === Math.min(1, spec.dates - 1)
        ? pick(homeVenues, random)
        : pick(venues, random);
    const going = fansGoing(random);
    return {
      id: `${spec.band.id}-${index + 1}`,
      band: spec.band,
      venue,
      date: addDays(today, offset),
      tickets: ticketState(random),
      fans: { going, sharesYourBands: Math.floor(going * random() * 0.6) },
    };
  });
}

function pickOffsets(count: number, random: () => number): number[] {
  const offsets = new Set<number>();
  while (offsets.size < count) {
    offsets.add(1 + Math.floor(random() * TOUR_WINDOW_DAYS));
  }
  return [...offsets].sort((a, b) => a - b);
}

/** Spread across the four tag steps (1–4, 5–19, 20–99, 100+) and zero. */
function fansGoing(random: () => number): number {
  const r = random();
  if (r < 0.15) return 0;
  if (r < 0.35) return 1 + Math.floor(random() * 4);
  if (r < 0.6) return 5 + Math.floor(random() * 15);
  if (r < 0.88) return 20 + Math.floor(random() * 80);
  return 100 + Math.floor(random() * 90);
}

function ticketState(random: () => number): TicketState {
  const r = random();
  if (r < 0.1) return "sold-out";
  if (r < 0.22) return "low";
  return "available";
}

function pick<T>(items: readonly T[], random: () => number): T {
  const item = items[Math.floor(random() * items.length)];
  if (item === undefined) throw new Error("pick from an empty list");
  return item;
}

/** mulberry32, seeded from a string, so fixtures are stable across runs. */
function seededRandom(seed: string): () => number {
  let state = 0;
  for (const char of seed) state = (Math.imul(state, 31) + char.charCodeAt(0)) | 0;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
