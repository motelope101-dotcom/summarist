"use client";

import { useEffect, useState } from "react";
import { db, auth } from "@/contexts/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import ProtectedRoute from "@/components/ProtectedRoute";
import BookCard from "@/components/BookCard"; 

interface Recommendation {
  bookId: string;
  reason: string;
}

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
}

export default function ForYouPage() {
  const [recommendedBooks, setRecommendedBooks] = useState<(Book & { reason: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          setError("No user logged in.");
          return;
        }

        // Get user doc
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          const recs = (data.recommendations || []) as Recommendation[];

          // Join with books collection
          const bookPromises = recs.map(async (rec) => {
            const bookRef = doc(db, "books", rec.bookId);
            const bookSnap = await getDoc(bookRef);

            if (bookSnap.exists()) {
              const bookData = bookSnap.data() as Omit<Book, "id">;
              return {
                ...bookData,
                id: bookSnap.id,
                reason: rec.reason,
              };
            }
            return null;
          });

          const books = (await Promise.all(bookPromises)).filter(Boolean) as (Book & { reason: string })[];
          setRecommendedBooks(books);
        } else {
          setError("User document not found.");
        }
      } catch (err) {
        console.error("Error fetching recommendations:", err);
        setError("Failed to load recommendations. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <ProtectedRoute>
      <section className="flex min-h-[60vh] flex-col items-center justify-center p-8 bg-[#0a0a0f]">
        <h1 className="text-3xl font-bold text-white">For You</h1>
        <p className="mt-4 text-neutral-300">Personalized recommendations.</p>

        {loading && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
            {[...Array(4)].map((_, i) => (
              <BookCard key={i} loading />
            ))}
          </div>
        )}

        {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}

        {!loading && !error && recommendedBooks.length === 0 && (
          <p className="mt-2 text-neutral-300 text-sm">No recommendations yet.</p>
        )}

        {!loading && !error && recommendedBooks.length > 0 && (
          <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
            {recommendedBooks.map((book) => (
              <li key={book.id} className="flex flex-col gap-y-2">
                <BookCard book={book} />
                <p className="text-sm text-neutral-500 italic">{book.reason}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </ProtectedRoute>
  );
}