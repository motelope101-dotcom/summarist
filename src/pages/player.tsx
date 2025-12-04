// src/pages/player.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import { db } from "@/contexts/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

type Book = {
  id: string;
  title: string;
};

export default function PlayerLandingPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const snapshot = await getDocs(collection(db, "books"));
        const data: Book[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          title: (doc.data() as { title: string }).title,
        }));
        setBooks(data);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to load available players.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <ProtectedRoute>
      <section className="flex min-h-[60vh] flex-col items-center justify-center p-8">
        <h1 className="text-3xl font-bold text-white">Player</h1>
        <p className="mt-2 text-neutral-400">
          Welcome to the Summarist Player. Select a book to start listening.
        </p>

        {loading && (
          <p className="mt-4 text-neutral-500">Loading available players…</p>
        )}

        {error && (
          <p className="mt-4 text-red-500">{error}</p>
        )}

        {!loading && !error && books.length === 0 && (
          <p className="mt-4 text-neutral-400">
            No books available. Add some in Firestore!
          </p>
        )}

        {!loading && !error && books.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            {books.map((book) => (
              <Link
                key={book.id}
                href={`/player/${book.id}`}
                className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded"
              >
                Play {book.title}
              </Link>
            ))}
          </div>
        )}
      </section>
    </ProtectedRoute>
  );
}