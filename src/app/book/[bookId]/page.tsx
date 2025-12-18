"use client";

import { useEffect, useState } from "react";
import { db } from "@/contexts/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import AudioPlayer from "@/components/AudioPlayer";
import Image from "next/image";

type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  coverUrl: string;
  audioUrl: string;
};

export default function BookDetailPage() {
  const params = useParams() as { bookId?: string };
  const id = params.bookId ?? "";
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true; // cleanup 

    const fetchBook = async () => {
      if (!id) {
        if (isActive) setError("No book ID provided.");
        setLoading(false);
        return;
      }
      try {
        const docRef = doc(db, "books", id);
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
              audioUrl: String(data.audioUrl ?? ""),
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
      isActive = false; // cleanup
    };
  }, [id]);

  if (loading) return <p className="text-neutral-300 p-8">Loading book...</p>;
  if (error) return <p className="text-neutral-300 p-8">{error}</p>;
  if (!book) return <p className="text-neutral-300 p-8">Book not found.</p>;

  return (
    <section className="p-8 bg-[#0a0a0f] min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-2">{String(book.title)}</h1>
      <p className="text-neutral-300 mb-4">by {String(book.author)}</p>

      {book.coverUrl ? (
        <Image
          src={book.coverUrl}
          alt={String(book.title ?? "Book cover")}
          width={192}
          height={288}
          className="object-cover rounded shadow mb-6"
        />
      ) : (
        <div className="w-[192px] h-[288px] bg-neutral-700 rounded shadow mb-6 flex items-center justify-center text-neutral-400">
          No Cover
        </div>
      )}

      <p className="text-neutral-200 mb-6">{String(book.description)}</p>

      {book.audioUrl ? (
        <AudioPlayer
          audioUrl={String(book.audioUrl)}
          bookId={String(book.id)}
          aria-label={`Audio player for ${String(book.title)}`}
        />
      ) : (
        <p className="text-red-400">No audio available for this book.</p>
      )}
    </section>
  );
}