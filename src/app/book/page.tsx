"use client";

import { useEffect, useState } from "react";
import { db } from "@/contexts/firebaseConfig"; 
import { collection, getDocs } from "firebase/firestore";
import BookCard from "@/components/BookCard";

type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  coverUrl: string;
};

export default function BookPage() {
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

  if (loading) {
    return <p className="text-neutral-300 p-8">Loading books...</p>;
  }

  return (
    <section className="p-8">
      <h1 className="text-3xl font-bold text-white mb-6">Books</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}