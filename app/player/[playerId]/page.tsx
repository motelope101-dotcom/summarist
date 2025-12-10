"use client";

import { useParams } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import AudioPlayer from "@/components/AudioPlayer"; 
import { useEffect, useState } from "react";
import { db } from "@/contexts/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";

type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  coverUrl?: string;
};

export default function PlayerPage() {
  const { bookId } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      if (!bookId || typeof bookId !== "string") return;
      try {
        const docRef = doc(db, "books", bookId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = { id: docSnap.id, ...(docSnap.data() as Omit<Book, "id">) };
          setBook(data);
        } else {
          setError("Book not found.");
        }
      } catch (err) {
        console.error("Error fetching book:", err);
        setError("Failed to load book details.");
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [bookId]);

  if (!bookId) {
    return (
      <section className="flex min-h-[60vh] flex-col items-center justify-center bg-[#816678]">
        <h1 className="text-2xl font-bold text-white">Player Not Found</h1>
        <p className="mt-2 text-neutral-300">No audio available for this book.</p>
      </section>
    );
  }

  return (
    <ProtectedRoute>
      <section className="p-8 flex flex-col items-center bg-[#816678] min-h-[60vh]">
        {loading && <p className="text-neutral-300 mt-4">Loading book…</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}

        {!loading && !error && book && (
          <>
            {book.coverUrl && (
              <Image
                src={book.coverUrl}
                alt={book.title}
                width={160}
                height={224}
                className="rounded object-cover mb-4"
              />
            )}
            <h1 className="text-3xl font-bold text-white">{book.title}</h1>
            <p className="mt-2 text-neutral-400">by {book.author}</p>
            <p className="mt-4 text-neutral-300 max-w-xl text-center">
              {book.description}
            </p>

            {/*reusable AudioPlayer */}
            <div className="mt-8 w-full max-w-xl">
              <AudioPlayer bookId={book.id} />
            </div>
          </>
        )}
      </section>
    </ProtectedRoute>
  );
}