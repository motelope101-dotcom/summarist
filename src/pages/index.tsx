// src/pages/index.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "@/contexts/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import ProtectedRoute from "@/components/ProtectedRoute";

type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
};

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "books"));
        const booksData: Book[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Book, "id">),
        }));
        setBooks(booksData);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to load featured books. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <ProtectedRoute>
      <main className="flex flex-col items-center justify-center min-h-screen bg-[#816678] px-6">
        {/* Hero Section */}
        <section className="text-center mt-12 mb-8">
          <h1 className="text-4xl font-bold text-white">Summarist</h1>
          <p className="mt-2 text-neutral-300">
            Your gateway to book summaries and insights.
          </p>
        </section>

        {/* Featured Books Grid */}
        {loading && (
          <p className="text-neutral-400">Loading featured books…</p>
        )}

        {error && (
          <p className="text-red-500">{error}</p>
        )}

        {!loading && !error && books.length === 0 && (
          <p className="text-neutral-300">No featured books available.</p>
        )}

        {!loading && !error && books.length > 0 && (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
            {books.map((book) => (
              <div
                key={book.id}
                className="bg-neutral-800 rounded-lg shadow-md p-4 hover:shadow-lg transition flex flex-col"
              >
                <div className="h-40 bg-neutral-700 rounded mb-3 flex items-center justify-center">
                  <span className="text-neutral-400">Cover</span>
                </div>
                <h2 className="text-lg font-semibold text-white">
                  {book.title}
                </h2>
                <p className="text-sm text-neutral-400 mt-1">by {book.author}</p>
                <p className="text-sm text-neutral-300 mt-1 line-clamp-3">
                  {book.description}
                </p>
                <Link
                  href={`/book/${book.id}`}
                  className="mt-3 inline-block text-purple-400 hover:underline text-sm"
                >
                  Read More →
                </Link>
              </div>
            ))}
          </section>
        )}
      </main>
    </ProtectedRoute>
  );
}