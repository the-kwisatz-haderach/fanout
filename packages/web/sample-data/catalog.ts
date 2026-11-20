import type { Band, City, Genre, Venue } from "@fanout/shared";

/*
 * Fictional sample catalogue. Cities are real places; every band and venue is
 * invented. Nothing here describes a real artist, venue or event.
 */

const city = (id: string, name: string): City => ({ id, name });

export const SAMPLE_CITIES = {
  stockholm: city("stockholm", "Stockholm"),
  gothenburg: city("gothenburg", "Gothenburg"),
  malmo: city("malmo", "Malmö"),
  oslo: city("oslo", "Oslo"),
  copenhagen: city("copenhagen", "Copenhagen"),
  berlin: city("berlin", "Berlin"),
  hamburg: city("hamburg", "Hamburg"),
  amsterdam: city("amsterdam", "Amsterdam"),
  london: city("london", "London"),
  manchester: city("manchester", "Manchester"),
} satisfies Record<string, City>;

/** The city the page treats as the visitor's until they choose one. */
export const DEFAULT_CITY_ID = SAMPLE_CITIES.stockholm.id;

const venue = (id: string, name: string, at: City): Venue => ({ id, name, city: at });
const c = SAMPLE_CITIES;

export const SAMPLE_VENUES: readonly Venue[] = [
  venue("northgate-hall", "Northgate Hall", c.stockholm),
  venue("sodra-lampan", "Södra Lampan", c.stockholm),
  venue(
    "municipal-assembly-rooms",
    "The Municipal Assembly Rooms and Former Tram Depot",
    c.stockholm,
  ),
  venue("kollektiv", "Kollektiv", c.gothenburg),
  venue("pier-9", "Pier 9", c.gothenburg),
  venue("lantern-room", "The Lantern Room", c.malmo),
  venue("lokstallet-bakgard", "Lokstallet Bakgård", c.malmo),
  venue("grunerlokka-sound-house", "Grünerløkka Sound House", c.oslo),
  venue("vester-bunker", "Vester Bunker", c.copenhagen),
  venue("spree-pumpwerk", "Spree Pumpwerk", c.berlin),
  venue("hinterhof-sieben", "Hinterhof Sieben", c.berlin),
  venue("dockside-kantine", "Dockside Kantine", c.hamburg),
  venue("de-groene-sluis", "De Groene Sluis", c.amsterdam),
  venue("cartographers-arms", "The Cartographers' Arms", c.london),
  venue(
    "old-bonded-warehouse",
    "The Old Bonded Warehouse Upstairs Function Room",
    c.london,
  ),
  venue("ancoats-boiler-room", "Ancoats Boiler Room", c.manchester),
];

const genre = (id: string, name: string): Genre => ({ id, name });

export const SAMPLE_GENRES = {
  postPunk: genre("post-punk", "Post-punk"),
  shoegaze: genre("shoegaze", "Shoegaze"),
  indieFolk: genre("indie-folk", "Indie folk"),
  synthPop: genre("synth-pop", "Synth-pop"),
  hardcore: genre("hardcore", "Hardcore"),
  dreamPop: genre("dream-pop", "Dream pop"),
  garageRock: genre("garage-rock", "Garage rock"),
  jazz: genre("jazz", "Jazz"),
} satisfies Record<string, Genre>;

/** A band plus how its sample tour is generated. */
export interface SampleBandSpec {
  band: Band;
  /** Number of tour dates, 1–15. */
  dates: number;
  /** Never play the default city, so "no dates near you" is reachable. */
  skipsDefaultCity?: boolean;
}

const g = SAMPLE_GENRES;
const spec = (
  id: string,
  name: string,
  genres: Genre[],
  dates: number,
  skipsDefaultCity = false,
): SampleBandSpec => ({ band: { id, name, genres }, dates, skipsDefaultCity });

export const SAMPLE_BAND_SPECS: readonly SampleBandSpec[] = [
  spec("moth-parade", "Moth Parade", [g.postPunk], 12),
  spec("holloway-static", "Holloway Static", [g.postPunk, g.hardcore], 9),
  spec("saltglass", "Saltglass", [g.shoegaze, g.dreamPop], 7),
  spec("ines-varga", "Ines Varga", [g.indieFolk], 5),
  spec("velvet-antenna", "Velvet Antenna", [g.synthPop], 15),
  spec("the-narrow-sea", "The Narrow Sea", [g.indieFolk, g.dreamPop], 4),
  spec("grey-meridian", "Grey Meridian", [g.postPunk], 6, true),
  spec("fern-and-fathom", "Fern & Fathom", [g.indieFolk], 3),
  spec("pale-harbour", "Pale Harbour", [g.shoegaze], 8),
  spec("copper-lungs", "Copper Lungs", [g.hardcore], 11),
  spec("silt-choir", "Silt Choir", [g.dreamPop], 2, true),
  spec("neon-psalter", "Neon Psalter", [g.synthPop, g.postPunk], 10),
  spec("ostrich-theory", "Ostrich Theory", [g.garageRock], 6),
  spec("glasshouse-weather", "Glasshouse Weather", [g.shoegaze], 13),
  spec("dagny-and-the-ferrymen", "Dagny & the Ferrymen", [g.indieFolk], 5),
  spec("brutal-tenderness", "Brutal Tenderness", [g.hardcore, g.garageRock], 9),
  spec("kestrel-union", "Kestrel Union", [g.postPunk], 7),
  spec("lowtide-assembly", "Lowtide Assembly", [g.jazz], 4),
  spec(
    "the-unremarkable-saturdays",
    "The Unremarkable Saturdays",
    [g.garageRock],
    8,
  ),
  spec("orbit-cafe-disaster", "Orbit Café Disaster", [g.synthPop], 6),
  spec(
    "hymns-for-parking-garages",
    "Hymns for Parking Garages",
    [g.shoegaze, g.postPunk],
    14,
  ),
  spec("marrow-lantern", "Marrow Lantern", [g.dreamPop], 3),
  spec("sunday-antlers", "Sunday Antlers", [g.indieFolk, g.garageRock], 10),
  spec("tin-cathedral", "Tin Cathedral", [g.postPunk, g.hardcore], 12),
  spec("wren-signal", "Wren Signal", [g.synthPop, g.dreamPop], 5),
  spec("mopeds-of-ruin", "Mopeds of Ruin", [g.garageRock, g.hardcore], 7),
  spec(
    "lighthouse-keeper",
    "And So the Lighthouse Keeper Said Nothing at All",
    [g.indieFolk, g.jazz],
    6,
  ),
  spec("vasterhavet-kollektiv", "Västerhavet Kollektiv", [g.jazz], 1, true),
  spec("polaroid-funeral", "Polaroid Funeral", [g.postPunk, g.shoegaze], 9),
  spec("ash-and-ampersand", "Ash & Ampersand", [g.dreamPop, g.synthPop], 15),
];
