import type { FanSignal } from '../concert.ts'

/** Size step of the fans-going tag: 1–4, 5–19, 20–99, 100+ fans going. */
export type FansTagStep = 1 | 2 | 3 | 4

/** The fans-going tag on a date near you: counts only, never faces or names. */
export interface FansTag {
  step: FansTagStep
  going: number
  /** Of those going, how many share at least one of the visitor's bands. */
  sharesYourBands: number
}

/** Lowest fans-going count of each step, largest first. */
const STEP_FLOORS: readonly [number, FansTagStep][] = [
  [100, 4],
  [20, 3],
  [5, 2],
  [1, 1],
]

/** The tag for a date, or `null` when it isn't near you or nobody is going yet. */
export function fansTag(fans: FanSignal, near: boolean): FansTag | null {
  if (!near) return null
  const step = STEP_FLOORS.find(([floor]) => fans.going >= floor)?.[1]
  if (step === undefined) return null
  return { step, going: fans.going, sharesYourBands: fans.sharesYourBands }
}
