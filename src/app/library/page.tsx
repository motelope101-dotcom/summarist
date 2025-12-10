"use client";

import { useEffect, useState } from "react";
import { db } from "@/contexts/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import ProtectedRoute from "@/components/ProtectedRoute";
import BookCard from "@/components/BookCard";
import { SearchBar } from "@/components/SearchBar";

type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
};

export default function LibraryPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = async (searchTerm?: string) => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "books"));
      const allBooks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Book, "id">),
      }));

      if (searchTerm) {
        const filtered = allBooks.filter(
          (b) =>
            b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setBooks(filtered);
      } else {
        setBooks(allBooks);
      }
    } catch (err) {
      console.error("Error fetching books:", err);
      setError("Failed to load your library. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <ProtectedRoute>
      <div className="p-8">
        <SearchBar onSearch={fetchBooks} />
        <section className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading &&
            Array.from({ length: 6 }).map((_, i) => <BookCard key={i} loading />)}

          {error && <p className="text-red-500">{error}</p>}

          {!loading && !error && books.length === 0 && (
            <p className="text-neutral-400">No results found.</p>
          )}

          {!loading &&
            !error &&
            books.map((book) => <BookCard key={book.id} book={book} />)}
        </section>
      </div>
    </ProtectedRoute>
  );
}