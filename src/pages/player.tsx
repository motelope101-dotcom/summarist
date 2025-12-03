import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";

export default function PlayerLandingPage() {
  return (
    <ProtectedRoute>
      <section className="flex min-h-[60vh] flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-white">Player</h1>
        <p className="mt-2 text-neutral-400">
          Welcome to the Summarist Player. Select a book to start listening.
        </p>
        <div className="mt-6 flex gap-4">
          {/* links to dynamic player routes */}
          <Link
            href="/player/atomic-habits"
            className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded"
          >
            Play Atomic Habits
          </Link>
          <Link
            href="/player/deep-work"
            className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded"
          >
            Play Deep Work
          </Link>
        </div>
      </section>
    </ProtectedRoute>
  );
}