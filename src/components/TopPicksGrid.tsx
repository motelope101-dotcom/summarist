"use client";

import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image from "next/image";

interface Book {
  title: string;
  author: string;
  coverUrl: string;
  description?: string;
  audioUrl?: string;
}

export default function TopPicksGrid() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchTopPicks = async () => {
      const q = query(collection(db, "books"), where("category", "==", "top"));
      const snapshot = await getDocs(q);
      setBooks(snapshot.docs.map((doc) => doc.data() as Book));
    };
    fetchTopPicks();
  }, []);

  if (!books.length) return <p>Loading top picks...</p>;

  return (
    <section>
      <h2>Top Picks</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
        {books.map((book) => (
          <div key={book.title}>
            <Image
              src={book.coverUrl}
              alt={book.title}
              width={150}
              height={220}
            />
            <h3>{book.title}</h3>
            <p>{book.author}</p>
          </div>
        ))}
      </div>
    </section>
  );
}