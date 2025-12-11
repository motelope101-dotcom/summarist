"use client";

import { BookOpenIcon, SparklesIcon, PlayCircleIcon } from "@heroicons/react/24/outline";

export default function HomePage() {
  return (
    <div className="p-6 space-y-6">
      {/* Featured Book */}
      <section>
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <BookOpenIcon className="h-5 w-5 text-indigo-400 flex-shrink-0" />
          Featured Book
        </h2>
        <p className="text-neutral-400">Loading featured book...</p>
      </section>

      {/* Top Picks */}
      <section>
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <SparklesIcon className="h-5 w-5 text-pink-400 flex-shrink-0" />
          Top Picks
        </h2>
        <p className="text-neutral-400">Loading top picks...</p>
      </section>

      {/* Continue Listening */}
      <section>
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <PlayCircleIcon className="h-5 w-5 text-green-400 flex-shrink-0" />
          Continue Listening
        </h2>
        <p className="text-neutral-400">No books in progress</p>
      </section>
    </div>
  );
}