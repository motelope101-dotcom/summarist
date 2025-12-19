"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/contexts/firebaseConfig";
import Link from "next/link";
import Image from "next/image";

type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  coverUrl: string;
};

export default function BookPage() {
  const params = useParams() as { bookId?: string };
  const bookId = params.bookId;
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    const fetchBook = async () => {
      if (!bookId) {
        if (isActive) setError("No book ID provided.");
        setLoading(false);
        return;
      }
      try {
        const docRef = doc(db, "books", bookId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as Partial<Book>;
          if (isActive) {
            setBook({
              id: String(docSnap.id),
              title: String(data.title ?? ""),
              author: String(data.author ?? ""),
              description: String(data.description ?? ""),
              coverUrl: String(data.coverUrl ?? ""),
            });
          }
        } else {
          if (isActive) setError("Book not found.");
        }
      } catch (err) {
        console.error("Error fetching book:", err);
        if (isActive) setError("Failed to load book. Please try again later.");
      } finally {
        if (isActive) setLoading(false);
      }
    };

    fetchBook();
    return () => {
      isActive = false;
    };
  }, [bookId]);

  if (loading) return <p className="text-neutral-300 p-8">Loading book...</p>;
  if (error) return <p className="text-neutral-300 p-8">{error}</p>;
  if (!book) return <p className="text-neutral-300 p-8">Book not found.</p>;

  return (
    <section className="px-6 py-8 flex flex-col items-center text-white bg-[#0a0a0f] min-h-screen">
      {book.coverUrl ? (
        <Image
          src={book.coverUrl}
          alt={String(book.title ?? "Book cover")}
          width={192}
          height={288}
          className="object-cover rounded shadow-lg mb-6"
        />
      ) : (
        <div className="w-[192px] h-[288px] bg-neutral-700 rounded shadow mb-6 flex items-center justify-center text-neutral-400">
          No Cover
        </div>
      )}

      <h1 className="text-3xl font-bold mb-2">{String(book.title)}</h1>
      <h2 className="text-lg text-neutral-400">by {String(book.author)}</h2>
      <p className="mt-4 max-w-xl text-center text-neutral-300">
        {String(book.description)}
      </p>

      <Link
        href={`/player/${book.id}`}
        className="mt-6 bg-indigo-600 hover:bg-indigo-500 hover:shadow-lg hover:scale-[1.02] text-white px-4 py-2 rounded transition"
      >
        Listen Now
      </Link>
    </section>
  );
}