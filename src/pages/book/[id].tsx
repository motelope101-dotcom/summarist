// src/pages/book/[id].tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db } from "@/contexts/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import ProtectedRoute from "@/components/ProtectedRoute";

type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
};

export default function BookDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      if (!id || typeof id !== "string") return;

      try {
        const docRef = doc(db, "books", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setBook({ id: docSnap.id, ...(docSnap.data() as Omit<Book, "id">) });
        } else {
          setError("Book not found.");
        }
      } catch (err) {
        console.error("Error fetching book:", err);
        setError("Failed to load book details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  return (
    <ProtectedRoute>
      <section className="p-8 flex flex-col items-center min-h-[60vh] bg-[#816678]">
        {loading && (
          <p className="text-neutral-300">Loading book details…</p>
        )}

        {error && (
          <>
            <h1 className="text-2xl font-bold text-white">Book Not Found</h1>
            <p className="mt-2 text-neutral-300">{error}</p>
          </>
        )}

        {!loading && !error && book && (
          <>
            <h1 className="text-3xl font-bold text-white">{book.title}</h1>
            <p className="mt-2 text-neutral-400">by {book.author}</p>
            <p className="mt-4 text-neutral-300 max-w-xl text-center">
              {book.description}
            </p>
          </>
        )}
      </section>
    </ProtectedRoute>
  );
}