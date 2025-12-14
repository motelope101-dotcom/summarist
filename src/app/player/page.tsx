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
        const data: Book[] = snapshot.docs.map((doc) => {
          const d = doc.data();
          return {
            id: doc.id,
            title: d.title ?? "Untitled",
          };
        });
        setBooks(data);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to load available books.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <ProtectedRoute>
      <section className="p-8 min-h-[60vh] flex flex-col items-center">
        <h1 className="text-3xl font-bold text-white">Summarist Player</h1>
        <p className="mt-2 text-neutral-400">
          Select a book below to start listening.
        </p>

        {loading && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-neutral-800 rounded-lg p-4 shadow"
              >
                <div className="bg-neutral-700 h-6 w-2/3 rounded"></div>
              </div>
            ))}
          </div>
        )}

        {error && <p className="mt-4 text-red-500">{error}</p>}

        {!loading && !error && books.length === 0 && (
          <p className="mt-4 text-neutral-400">
            No books available. Add some in Firestore.
          </p>
        )}

        {!loading && !error && books.length > 0 && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            {books.map((book) => (
              <Link
                key={book.id}
                href={`/player/${book.id}`}
                aria-label={`Play ${book.title}`}
                className="bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg p-4 shadow transition flex justify-between items-center"
              >
                <span className="font-semibold">{book.title}</span>
                <span className="text-indigo-400 text-sm">Play</span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </ProtectedRoute>
  );
}