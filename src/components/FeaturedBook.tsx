"use client";

import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Book {
  id?: string;
  title: string;
  author: string;
  coverUrl: string;
  description?: string;
  audioUrl?: string;
}

export default function FeaturedBook() {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const q = query(collection(db, "books"), where("featured", "==", true));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const doc = snapshot.docs[0];
          const data = doc.data();
          setBook({
            id: doc.id,
            title: data.title ?? "Untitled",
            author: data.author ?? "Unknown",
            coverUrl: data.coverUrl ?? "/placeholder.png",
            description: data.description ?? "",
            audioUrl: data.audioUrl ?? "",
          });
        }
      } catch (err) {
        console.error("Error fetching featured book:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  if (loading) {
    return <p className="text-neutral-400 px-6 py-4">Loading featured book…</p>;
  }

  if (!book) {
    return <p className="text-neutral-400 px-6 py-4">No featured book available.</p>;
  }

  return (
    <section className="mt-8 bg-neutral-800 rounded-lg p-6 shadow flex flex-col items-center text-center">
      <h2 className="text-2xl font-bold text-white mb-6">Featured Book</h2>
      <Image
        src={book.coverUrl}
        alt={`Cover of ${book.title}`}
        width={200}
        height={300}
        priority
        className="rounded shadow-lg mb-6 object-cover"
      />
      <h3 className="text-lg font-semibold text-white">{book.title}</h3>
      <p className="text-sm text-neutral-400 mb-4">by {book.author}</p>
      {book.description && (
        <p className="text-neutral-300 line-clamp-3 mb-6 max-w-md">{book.description}</p>
      )}
      <button
        onClick={() => router.push(`/player/${book.id}`)}
        aria-label={`Start listening to ${book.title}`}
        className="bg-indigo-600 hover:bg-indigo-500 hover:shadow-lg hover:scale-[1.02] text-white px-6 py-2 rounded transition"
      >
        Start Listening
      </button>
    </section>
  );
}