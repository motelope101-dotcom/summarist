"use client";

import { useEffect, useState } from "react";
import { db, auth } from "@/contexts/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";

interface Book {
  id: string;
  title: string;
  author: string;
  summary?: string;
  userId?: string;
}

export default function ForYouPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const user = auth.currentUser;
        const baseCollection = collection(db, "recommendations");
        const q = user
          ? query(baseCollection, where("userId", "==", user.uid))
          : baseCollection;

        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => {
          const d = doc.data();
          return {
            id: doc.id,
            title: d.title ?? "Untitled",
            author: d.author ?? "Unknown",
            summary: d.summary ?? "",
            userId: d.userId ?? "",
          } as Book;
        });

        setBooks(data);
      } catch (err) {
        console.error("Error fetching recommendations:", err);
        setError("Failed to load recommendations. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <ProtectedRoute>
      <section className="flex min-h-[60vh] flex-col items-center justify-center p-8 bg-[#0a0a0f]">
        <h1 className="text-3xl font-bold text-white">For You</h1>
        <p className="mt-4 text-neutral-300">Personalized recommendations.</p>

        {loading && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-neutral-800 p-4 rounded-lg animate-pulse h-32"
              />
            ))}
          </div>
        )}

        {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}

        {!loading && !error && books.length === 0 && (
          <p className="mt-2 text-neutral-300 text-sm">
            No recommendations yet.
          </p>
        )}

        {!loading && !error && books.length > 0 && (
          <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
            {books.map((book) => (
              <li
                key={book.id}
                className="bg-neutral-800 p-4 rounded-lg shadow hover:shadow-lg transition"
              >
                <Link
                  href={`/book/${book.id}`}
                  aria-label={`View details for ${book.title}`}
                >
                  <h2 className="text-lg font-semibold text-white">
                    {book.title}
                  </h2>
                  <p className="text-neutral-400">by {book.author}</p>
                  {book.summary && (
                    <p className="mt-2 text-neutral-300 text-sm line-clamp-3">
                      {book.summary}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </ProtectedRoute>
  );
}