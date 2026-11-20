"use client";

import { useSyncExternalStore } from "react";
import { toggleMarkedShow } from "@fanout/shared";
import { savedMarkedShowIds } from "./device-store";

/**
 * Whether one concert is marked, and a toggle for it. Marked shows are saved on the
 * device through `savedMarkedShowIds`; the server render shows every show unmarked.
 */
export function useMarkedShow(concertId: string) {
  const marked = useSyncExternalStore(
    savedMarkedShowIds.subscribe,
    () => savedMarkedShowIds.read().includes(concertId),
    () => false,
  );

  return {
    marked,
    toggle: () => savedMarkedShowIds.write(toggleMarkedShow(savedMarkedShowIds.read(), concertId)),
  };
}
