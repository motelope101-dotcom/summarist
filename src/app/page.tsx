"use client";

import {
  BookOpenIcon,
  SparklesIcon,
  PlayCircleIcon,
} from "@heroicons/react/24/outline";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function HomePage() {
  return (
    <ProtectedRoute>
      <section className="p-6 space-y-6 bg-[#0a0a0f] min-h-screen">
        {/* Featured Book */}
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
            <BookOpenIcon className="h-5 w-5 flex-shrink-0 text-indigo-400" />
            Featured Book
          </h2>
          <p className="text-neutral-400">Loading featured book...</p>
        </div>

        {/* Top Picks */}
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
            <SparklesIcon className="h-5 w-5 flex-shrink-0 text-pink-400" />
            Top Picks
          </h2>
          <p className="text-neutral-400">Loading top picks...</p>
        </div>

        {/* Continue Listening */}
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
            <PlayCircleIcon className="h-5 w-5 flex-shrink-0 text-green-400" />
            Continue Listening
          </h2>
          <p className="text-neutral-400">No books in progress</p>
        </div>
      </section>
    </ProtectedRoute>
  );
}