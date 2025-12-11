"use client";

import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image from "next/image";
import Skeleton from "@/components/Skeleton";

interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  description?: string;
  audioUrl?: string;
}

export default function TopPicksGrid() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopPicks = async () => {
      try {
        const q = query(collection(db, "books"), where("category", "==", "top"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Book, "id">),
        }));
        setBooks(data);
      } catch (err) {
        console.error("Error fetching top picks:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTopPicks();
  }, []);

  return (
    <section className="mt-6">
      <h2 className="text-xl font-semibold text-white mb-4">Top Picks</h2>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-y-3">
              <Skeleton className="h-[220px] w-[150px]" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      )}

      {!loading && books.length === 0 && (
        <p className="text-neutral-400">No top picks available.</p>
      )}

      {!loading && books.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-neutral-800 rounded-lg p-4 shadow hover:shadow-lg transition flex flex-col items-center"
            >
              <Image
                src={book.coverUrl}
                alt={`Cover of ${book.title}`}
                width={150}
                height={220}
                className="rounded mb-3 object-cover"
              />
              <h3 className="text-lg font-bold text-white text-center">
                {book.title}
              </h3>
              <p className="text-sm text-neutral-400 text-center">by {book.author}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}