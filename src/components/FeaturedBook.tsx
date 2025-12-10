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

export default function FeaturedBook() {
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      const q = query(collection(db, "books"), where("featured", "==", true));
      const snapshot = await getDocs(q);
      snapshot.forEach((doc) => setBook(doc.data() as Book));
    };
    fetchFeatured();
  }, []);

  if (!book) return <p>Loading featured book...</p>;

  return (
    <section>
      <h2>Featured Book</h2>
      <Image
        src={book.coverUrl}
        alt={book.title}
        width={200}
        height={300}
        priority
      />
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <button>Start Listening</button>
    </section>
  );
}