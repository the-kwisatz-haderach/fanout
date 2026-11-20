import type { BandGroup } from './result.ts'

/**
 * Orders band columns so the likeliest company leads:
 * 1. bands with dates near you first;
 * 2. then by the highest shares-your-bands count among their near dates;
 * 3. ties broken by the highest fans-going count among those dates, then band name.
 * Far dates' counts never rank a band.
 */
export function rankBands(groups: readonly BandGroup[]): BandGroup[] {
  return groups
    .map((group) => ({ group, rank: nearSignal(group) }))
    .sort(
      (a, b) =>
        Number(b.rank.hasNear) - Number(a.rank.hasNear) ||
        b.rank.sharesYourBands - a.rank.sharesYourBands ||
        b.rank.going - a.rank.going ||
        a.group.band.name.localeCompare(b.group.band.name, 'en'),
    )
    .map(({ group }) => group)
}

function nearSignal(group: BandGroup) {
  const near = group.dates.filter((entry) => entry.near).map((entry) => entry.concert.fans)
  return {
    hasNear: near.length > 0,
    sharesYourBands: Math.max(0, ...near.map((fans) => fans.sharesYourBands)),
    going: Math.max(0, ...near.map((fans) => fans.going)),
  }
}
