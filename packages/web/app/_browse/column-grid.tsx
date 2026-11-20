import type { ReactNode } from "react";

/** Top-rule inks for result columns, cycled in page order (bone, pink, yellow). */
const TOP_RULES = ["border-bone", "border-pink", "border-process"] as const;

/** The top-rule class for the column at `index` in page order. */
export function topRuleClass(index: number): string {
  return TOP_RULES[index % TOP_RULES.length] ?? TOP_RULES[0];
}

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
