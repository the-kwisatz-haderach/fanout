import Link from "next/link";

/** Placeholder: the concert page comes in a later spec. */
export default function ConcertPage() {
  return (
    <main className="flex flex-1 flex-col items-start gap-4 p-6">
      <h1 className="font-display text-5xl font-extrabold uppercase">Concert</h1>
      <p>The concert page isn&rsquo;t built yet.</p>
      <Link
        href="/"
        className="font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-process"
      >
        Back to browsing
      </Link>
    </main>
  );
}
