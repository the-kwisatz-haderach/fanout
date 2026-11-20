/**
 * The only code that touches browser storage. Each saved value is a `SavedValue`,
 * so a signed-in store can implement the same interface later and replace this one
 * without the page changing.
 */

/** A value kept for the visitor between visits. Shaped for `useSyncExternalStore`. */
export interface SavedValue<T> {
  /** The current value. Returns the same reference until the value changes. */
  read(): T;
  write(value: T): void;
  /** Calls `onChange` whenever the value changes, here or in another tab. */
  subscribe(onChange: () => void): () => void;
}

/**
 * A value saved in this browser's local storage under `key`. `parse` checks what
 * was stored and returns `null` when it isn't a valid value, in which case
 * `fallback` is used. If storage is unavailable the value lasts for this visit only.
 */
export function deviceValue<T>(
  key: string,
  fallback: T,
  parse: (stored: unknown) => T | null,
): SavedValue<T> {
  const listeners = new Set<() => void>();
  let cachedRaw: string | null = null;
  let cached: T = fallback;
  /** Used when storage throws (blocked, private mode, full). */
  let memory: T | null = null;

  const notify = () => listeners.forEach((listener) => listener());
  const onStorage = (event: StorageEvent) => {
    if (event.key === key) notify();
  };

  return {
    read() {
      if (memory !== null) return memory;
      const raw = readRaw(key);
      if (raw !== cachedRaw) {
        cachedRaw = raw;
        cached = decode(raw, parse) ?? fallback;
      }
      return cached;
    },
    write(value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch {
        memory = value;
      }
      notify();
    },
    subscribe(onChange) {
      if (listeners.size === 0) window.addEventListener("storage", onStorage);
      listeners.add(onChange);
      return () => {
        listeners.delete(onChange);
        if (listeners.size === 0) window.removeEventListener("storage", onStorage);
      };
    },
  };
}

function readRaw(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function decode<T>(raw: string | null, parse: (stored: unknown) => T | null): T | null {
  if (raw === null) return null;
  try {
    return parse(JSON.parse(raw));
  } catch {
    return null;
  }
}

const isStringArray = (stored: unknown): string[] | null =>
  Array.isArray(stored) && stored.every((item) => typeof item === "string") ? stored : null;

/** The visitor's chosen band ids, in the order they added them. */
export const savedBandIds = deviceValue<string[]>("fanout:band-ids", [], isStringArray);
