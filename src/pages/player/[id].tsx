import { useRouter } from "next/router";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function PlayerPage() {
  const router = useRouter();
  const { id } = router.query;

  // Dummy player data (replace with Firestore later)
  const players: Record<string, { title: string; description: string }> = {
    sample: {
      title: "Sample Player",
      description: "Audio playback for book summaries.",
    },
    "atomic-habits": {
      title: "Atomic Habits Player",
      description: "Listen to the summary of Atomic Habits.",
    },
    "deep-work": {
      title: "Deep Work Player",
      description: "Listen to the summary of Deep Work.",
    },
  };

  const player = id ? players[id as string] : null;

  if (!player) {
    return (
      <ProtectedRoute>
        <section className="flex min-h-[60vh] flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-white">Player Not Found</h1>
          <p className="mt-2 text-neutral-400">
            No audio available for this player route.
          </p>
        </section>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <section className="p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-white">{player.title}</h1>
        <p className="mt-4 text-neutral-300 max-w-xl text-center">
          {player.description}
        </p>

        {/* Audio controls */}
        <div className="mt-6 w-full max-w-md">
          <audio controls className="w-full">
            <source src="/sample-audio.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </section>
    </ProtectedRoute>
  );
}