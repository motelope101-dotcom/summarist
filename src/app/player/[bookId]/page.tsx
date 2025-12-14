"use client";

import { useParams } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import AudioPlayer from "@/components/AudioPlayer";
import { useEffect, useState } from "react";
import { db } from "@/contexts/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import { PlayIcon, PauseCircleIcon } from "@heroicons/react/24/solid";

type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  coverUrl?: string;
  audioUrl?: string;
};

export default function PlayerPage() {
  const params = useParams() as { bookId?: string };
  const bookId = params.bookId ?? "";

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      if (!bookId) {
        setError("Book not available.");
        setLoading(false);
        return;
      }
      try {
        const docRef = doc(db, "books", bookId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = { id: docSnap.id, ...(docSnap.data() as Omit<Book, "id">) };
          setBook(data);
        } else {
          setError("Book not found.");
        }
      } catch (err) {
        console.error("Error fetching book:", err);
        setError("Failed to load book details.");
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [bookId]);

  return (
    <ProtectedRoute>
      <section className="p-8 flex flex-col items-center min-h-[60vh] bg-[#0a0a0f]">
        {loading && (
          <div className="flex items-center gap-2 mt-4 text-neutral-300">
            <PlayIcon
              className="h-5 w-5 flex-shrink-0 animate-pulse text-indigo-400"
              aria-label="Loading book"
            />
            <p>Loading book…</p>
          </div>
        )}

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {!loading && !error && book && (
          <>
            {book.coverUrl && (
              <Image
                src={book.coverUrl}
                alt={book.title}
                width={160}
                height={224}
                className="rounded object-cover mb-4"
              />
            )}
            <h1 className="text-3xl font-bold text-white">{book.title}</h1>
            <p className="mt-2 text-neutral-400">by {book.author}</p>
            <p className="mt-4 text-neutral-300 max-w-xl text-center">
              {book.description}
            </p>

            {/* playback icons */}
            <div className="flex gap-4 mt-6">
              <PlayIcon
                className="h-5 w-5 flex-shrink-0 text-green-400 cursor-pointer"
                aria-label="Play audio"
              />
              <PauseCircleIcon
                className="h-5 w-5 flex-shrink-0 text-red-400 cursor-pointer"
                aria-label="Pause audio"
              />
            </div>

            {/* Audio player */}
            <div className="mt-8 w-full max-w-xl">
              <AudioPlayer
                bookId={book.id}
                audioUrl={book.audioUrl ?? ""}
                aria-label={`Audio player for ${book.title}`}
              />
            </div>
          </>
        )}
      </section>
    </ProtectedRoute>
  );
}