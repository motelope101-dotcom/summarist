"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

interface ProgressItem {
  bookId: string;
  title: string;
  currentTime: number; // playback position in seconds
}

export default function ContinueListening() {
  const { user } = useAuth();
  const router = useRouter();
  const [progress, setProgress] = useState<ProgressItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchProgress = async () => {
      try {
        const snapshot = await getDocs(collection(db, `users/${user.uid}/progress`));
        const items: ProgressItem[] = snapshot.docs.map((doc) => {
          const d = doc.data();
          return {
            bookId: d.bookId ?? doc.id,
            title: d.title ?? "Untitled",
            currentTime: d.currentTime ?? 0,
          };
        });
        setProgress(items);
      } catch (err) {
        console.error("Error fetching progress:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [user]);

  if (!user) return null;

  if (loading) {
    return <p className="text-neutral-400">Loading progress…</p>;
  }

  if (!progress.length) {
    return <p className="text-neutral-400">No books in progress.</p>;
  }

  return (
    <section className="mt-6">
      <h2 className="text-xl font-semibold text-white mb-4">Continue Listening</h2>
      <ul className="space-y-4">
        {progress.map((item) => (
          <li
            key={item.bookId}
            className="bg-neutral-800 rounded-lg p-4 shadow flex items-center justify-between"
          >
            <p className="text-neutral-300">
              {item.title} — {Math.floor(item.currentTime / 60)}m{" "}
              {Math.floor(item.currentTime % 60)}s
            </p>
            <button
              onClick={() => router.push(`/player/${item.bookId}`)}
              aria-label={`Resume ${item.title}`}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 rounded transition"
            >
              Resume
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}