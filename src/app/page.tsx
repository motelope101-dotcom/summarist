// src/app/page.tsx
"use client";

import { BookOpenIcon } from "@heroicons/react/24/outline";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { PlayCircleIcon } from "@heroicons/react/24/outline";

export default function HomePage() {
  return (
    <div className="p-6 space-y-6">
      {/* Featured Book */}
      <section>
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <BookOpenIcon className="h-6 w-6 text-indigo-400" />
          Featured Book
        </h2>
        <p className="text-neutral-400">Loading featured book...</p>
      </section>

      {/* Top Picks */}
      <section>
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <SparklesIcon className="h-6 w-6 text-pink-400" />
          Top Picks
        </h2>
        <p className="text-neutral-400">Loading top picks...</p>
      </section>

      {/* Continue Listening */}
      <section>
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <PlayCircleIcon className="h-6 w-6 text-green-400" />
          Continue Listening
        </h2>
        <p className="text-neutral-400">No books in progress</p>
      </section>
    </div>
  );
}