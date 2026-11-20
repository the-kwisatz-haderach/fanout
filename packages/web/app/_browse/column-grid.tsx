import type { ReactNode } from "react";

/**
 * Columns of at most 20rem: a wider screen adds whole columns (up to four) instead
 * of making lines longer. Shared by results and their loading placeholder so the
 * page doesn't jump when results arrive.
 */
export function ColumnGrid({ children, busy = false }: { children: ReactNode; busy?: boolean }) {
  return (
    <div
      aria-busy={busy || undefined}
      className="grid max-w-[calc(4*20rem+3*2rem)] grid-cols-[repeat(auto-fill,minmax(min(100%,16rem),20rem))] gap-x-8 gap-y-12"
    >
      {children}
    </div>
  );
}
