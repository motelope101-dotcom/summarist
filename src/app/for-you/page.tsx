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
        const userRef = doc(db, "user", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          const recs = (data.recommendations || []) as Recommendation[];

          const bookPromises = recs.map(async (rec) => {
            const bookRef = doc(db, "books", rec.bookId);
            const bookSnap = await getDoc(bookRef);

            if (bookSnap.exists()) {
              const bookData = bookSnap.data() as Omit<Book, "id">;
              return {
                id: bookSnap.id,
                title: bookData.title ?? "",
                author: bookData.author ?? "",
                description: bookData.description ?? "",
                reason: rec.reason ?? "",
              };
            }
            return null;
          });

          const books = (await Promise.all(bookPromises)).filter(Boolean) as (Book & { reason: string })[];
          if (isActive) setRecommendedBooks(books);
        } else {
          if (isActive) setError("BOOKS ARE AVAILABLE.");
        }
      } catch (err) {
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
      <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-8 bg-[#0a0a0f]">
        <h1 className="text-3xl font-bold text-white mb-2">For You</h1>
        <p className="text-neutral-300 mb-6">Personalized Recommendations.</p>
        <p className="text-neutral-300 mb-6">ATOMIC-HABITS.</p>
        <p className="text-neutral-300 mb-6">DEEP-WORK.</p>
        <p className="text-neutral-300 mb-6">THINKING-FAST-SLOW.</p>
        

        {(authLoading || loading) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
            {[...Array(6)].map((_, i) => (
              <BookCard key={i} loading />
            ))}
          </div>
        )}

        {error && <p className="mt-4 text-red-500 text-sm text-center">{error}</p>}

        {!authLoading && !loading && !error && recommendedBooks.length === 0 && (
          <p className="mt-4 text-neutral-400 text-sm text-center">No recommendations yet.</p>
        )}

        {!authLoading && !loading && !error && recommendedBooks.length > 0 && (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
            {recommendedBooks.map((book) => (
              <li key={book.id} className="flex flex-col gap-y-2">
                <BookCard
                  book={{
                    id: book.id,
                    title: book.title,
                    author: book.author,
                    description: book.description,
                  }}
                />
                <p className="text-sm text-neutral-500 italic">{book.reason}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </ProtectedRoute>
  );
}