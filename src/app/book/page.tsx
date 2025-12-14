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

  useEffect(() => {
    const fetchBook = async () => {
      if (!bookId) return;
      try {
        const docRef = doc(db, "books", bookId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setBook({ id: docSnap.id, ...(docSnap.data() as Omit<Book, "id">) });
        }
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [bookId]);

  if (loading) return <p className="text-neutral-300 p-8">Loading book...</p>;
  if (!book) return <p className="text-neutral-300 p-8">Book not found.</p>;

  return (
    <section className="p-8 flex flex-col items-center text-white">
      <Image
        src={book.coverUrl}
        alt={book.title}
        width={192}
        height={288}
        className="object-cover rounded shadow mb-6"
      />
      <h1 className="text-3xl font-bold">{book.title}</h1>
      <h2 className="text-lg text-neutral-400">by {book.author}</h2>
      <p className="mt-4 max-w-xl text-center">{book.description}</p>

      <Link
        href={`/player/${book.id}`}
        className="mt-6 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded transition"
      >
        Listen Now
      </Link>
    </section>
  );
}