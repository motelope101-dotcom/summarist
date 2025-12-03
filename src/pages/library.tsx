"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "@/lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
};

export default function LibraryPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "books"));
        const booksData: Book[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Book, "id">),
        }));
        setBooks(booksData);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <section className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      {loading ? (
        <p className="text-neutral-500">Loading your library...</p>
      ) : (
        books.map((book) => (
          <Link
            key={book.id}
            href={`/book/${book.id}`}
            className="bg-neutral-800 rounded-lg p-4 shadow hover:shadow-lg transition flex flex-col gap-y-4"
          >
            <article>
              <h2 className="text-lg font-bold text-white">{book.title}</h2>
              <p className="text-sm text-neutral-400">by {book.author}</p>
              <p className="text-neutral-300">{book.description}</p>
            </article>
          </Link>
        ))
      )}
    </section>
  );
}