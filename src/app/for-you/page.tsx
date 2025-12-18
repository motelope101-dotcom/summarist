"use client";

import { useEffect, useState } from "react";
import { db, auth } from "@/contexts/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import ProtectedRoute from "@/components/ProtectedRoute";
import BookCard from "@/components/BookCard";

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
  const [recommendedBooks, setRecommendedBooks] = useState<(Book & { reason: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true; // cleanup 

    const fetchRecommendations = async () => {
      try {
        const user = auth.currentUser;
        console.log("Current user:", user);

        if (!user) {
          if (isActive) setError("No user logged in.");
          return;
        }

        // Using "user" (singular) collection
        const userRef = doc(db, "user", user.uid);
        const userSnap = await getDoc(userRef);
        console.log("User snapshot exists:", userSnap.exists());

        if (userSnap.exists()) {
          const data = userSnap.data();
          console.log("User data:", data);

          const recs = (data.recommendations || []) as Recommendation[];

          const bookPromises = recs.map(async (rec) => {
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
          });

          const books = (await Promise.all(bookPromises)).filter(Boolean) as (Book & { reason: string })[];

          if (isActive) {
            console.log("RecommendedBooks snapshot:", books);
            setRecommendedBooks(books);
          }
        } else {
          if (isActive) setError("User document not found.");
        }
      } catch (err) {
        console.error("Error fetching recommendations:", err);
        if (isActive) setError("Failed to load recommendations. Please try again later.");
      } finally {
        if (isActive) setLoading(false);
      }
    };

    fetchRecommendations();
    return () => {
      isActive = false; // cleanup
    };
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
                <BookCard
                  book={{
                    id: String(book.id),
                    title: String(book.title),
                    author: String(book.author),
                    description: String(book.description),
                  }}
                />
                <p className="text-sm text-neutral-500 italic">
                  {String(book.reason)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </ProtectedRoute>
  );
}