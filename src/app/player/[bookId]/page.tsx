"use client";

import { useParams } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import AudioPlayer from "@/components/AudioPlayer";
import { useEffect, useState } from "react";
import { db } from "@/contexts/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";

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

  if (loading) {
    return (
      <ProtectedRoute>
        <section className="px-6 py-8 flex flex-col items-center min-h-[60vh] bg-[#0a0a0f]">
          <p className="text-neutral-300">Loading book…</p>
        </section>
      </ProtectedRoute>
    );
  }

  if (error) {
    return (
      <ProtectedRoute>
        <section className="px-6 py-8 flex flex-col items-center min-h-[60vh] bg-[#0a0a0f]">
          <p className="text-red-500 mt-4">{error}</p>
        </section>
      </ProtectedRoute>
    );
  }

  if (!book) {
    return (
      <ProtectedRoute>
        <section className="px-6 py-8 flex flex-col items-center min-h-[60vh] bg-[#0a0a0f]">
          <p className="text-neutral-300">Book not found.</p>
        </section>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <section className="px-6 py-8 flex flex-col items-center min-h-[60vh] bg-[#0a0a0f]">
        {book.coverUrl && (
          <Image
            src={book.coverUrl}
            alt={book.title}
            width={160}
            height={224}
            className="rounded object-cover mb-6 shadow-lg"
          />
        )}
        <h1 className="text-3xl font-bold text-white">{book.title}</h1>
        <p className="mt-2 text-neutral-400">by {book.author}</p>
        <p className="mt-4 text-neutral-300 max-w-xl text-center">
          {book.description}
        </p>

        <div className="mt-8 w-full max-w-xl">
          {book.audioUrl ? (
            <AudioPlayer
              bookId={book.id}
              audioUrl={book.audioUrl}
              aria-label={`Audio player for ${book.title}`}
            />
          ) : (
            <p className="text-red-400 mt-4">No audio available for this book.</p>
          )}
        </div>
      </section>
    </ProtectedRoute>
  );
}