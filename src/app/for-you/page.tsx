"use client";

import { useEffect, useState } from "react";
import { db } from "@/contexts/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import ProtectedRoute from "@/components/ProtectedRoute";
import BookCard from "@/components/BookCard";
import { useAuth } from "@/contexts/AuthContext";

interface Recommendation {
  bookId: string;
  reason: string;
  subscriptionStatus: string;
}

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
}

export default function ForYouPage() {
  const { user, loading: authLoading } = useAuth();
  const [recommendedBooks, setRecommendedBooks] = useState<(Book & { reason: string })[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    const fetchRecommendations = async () => {
      if (!user) return;

      try {
        const userRef = doc(db, "user", user.uid); // matches my Firestore
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          const recs = (data.recommendations || []) as Recommendation[];

          const bookPromises = recs.map(async (rec) => {
            try {
              const bookRef = doc(db, "books", rec.bookId);
              const bookSnap = await getDoc(bookRef);

              if (bookSnap.exists()) {
                const bookData = bookSnap.data() as Omit<Book, "id">;
                return {
                  id: String(bookSnap.id),
                  title: String(bookData.title ?? ""),
                  author: String(bookData.author ?? ""),
                  description: String(bookData.description ?? ""),
                  reason: String(rec.reason ?? ""),
                };
              }
              return null;
            } catch (err: unknown) {
              if (err instanceof Error && err.name === "AbortError") {
                return null; // ignores aborted requests
              }
              throw err;
            }
          });

          const books = (await Promise.all(bookPromises)).filter(Boolean) as (Book & { reason: string })[];
          if (isActive) setRecommendedBooks(books);
        } else {
          if (isActive) setError("User document not found.");
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") {
          return; // ignores aborted requests
        }
        console.error("Error fetching recommendations:", err);
        if (isActive) setError("Failed to load recommendations. Please try again later.");
      } finally {
        if (isActive) setLoading(false);
      }
    };

    if (!authLoading && user) {
      fetchRecommendations();
    } else {
      setLoading(false);
    }

    return () => {
      isActive = false;
    };
  }, [authLoading, user]);

  return (
    <ProtectedRoute>
      <section className="flex min-h-[60vh] flex-col items-center justify-center p-8 bg-[#0a0a0f]">
        <h1 className="text-3xl font-bold text-white">For You</h1>
        <p className="mt-4 text-neutral-300">Personalized recommendations.</p>

        {(authLoading || loading) && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
            {[...Array(4)].map((_, i) => (
              <BookCard key={i} loading />
            ))}
          </div>
        )}

        {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}

        {!authLoading && !loading && !error && recommendedBooks.length === 0 && (
          <p className="mt-2 text-neutral-300 text-sm">No recommendations yet.</p>
        )}

        {!authLoading && !loading && !error && recommendedBooks.length > 0 && (
          <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
            {recommendedBooks.map((book) => (
              <li key={book.id} className="flex flex-col gap-y-2">
                <BookCard
                  book={{
                    id: String(book.id),
                    title: String(book.title),
                    author: String(book.author),
                    description: String(book.description),
                  }}
                />
                <p className="text-sm text-neutral-500 italic">{String(book.reason)}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </ProtectedRoute>
  );
}