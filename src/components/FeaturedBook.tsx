"use client";

import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image from "next/image";

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

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const q = query(collection(db, "books"), where("featured", "==", true));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const doc = snapshot.docs[0]; 
          setBook({ id: doc.id, ...(doc.data() as Omit<Book, "id">) });
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
    return <p className="text-neutral-400">Loading featured book...</p>;
  }

  if (!book) {
    return <p className="text-neutral-400">No featured book available.</p>;
  }

  return (
    <section className="mt-6 bg-neutral-800 rounded-lg p-6 shadow flex flex-col items-center text-center">
      <h2 className="text-xl font-semibold text-white mb-4">Featured Book</h2>
      <Image
        src={book.coverUrl}
        alt={`Cover of ${book.title}`}
        width={200}
        height={300}
        priority
        className="rounded mb-4 object-cover"
      />
      <h3 className="text-lg font-bold text-white">{book.title}</h3>
      <p className="text-sm text-neutral-400 mb-2">by {book.author}</p>
      {book.description && (
        <p className="text-neutral-300 line-clamp-3 mb-4">{book.description}</p>
      )}
      <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded transition">
        Start Listening
      </button>
    </section>
  );
}