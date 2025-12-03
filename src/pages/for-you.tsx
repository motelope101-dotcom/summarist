"use client";

import { useEffect, useState } from "react";
import { db, auth } from "@/lib/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

interface Book {
  id: string;
  title: string;
  author: string;
  summary?: string;
  userId?: string; // optional for personalization
}

export default function ForYouPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const user = auth.currentUser;

        // If you want personalized recommendations per user:
        const baseCollection = collection(db, "recommendations");
        const q = user
          ? query(baseCollection, where("userId", "==", user.uid))
          : baseCollection;

        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Book[];

        setBooks(data);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-white">For You</h1>
      <p className="mt-4 text-neutral-400">Personalized recommendations.</p>

      {loading ? (
        <p className="mt-2 text-neutral-500 text-sm">
          Fetching tailored book summaries…
        </p>
      ) : books.length === 0 ? (
        <p className="mt-2 text-neutral-500 text-sm">
          No recommendations yet. (Add docs in Firestore!)
        </p>
      ) : (
        <ul className="mt-6 space-y-4 w-full max-w-md">
          {books.map((book) => (
            <li
              key={book.id}
              className="bg-neutral-800 p-4 rounded-lg shadow text-left"
            >
              <h2 className="text-lg font-semibold text-white">{book.title}</h2>
              <p className="text-neutral-400">by {book.author}</p>
              {book.summary && (
                <p className="mt-2 text-neutral-500 text-sm">{book.summary}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}