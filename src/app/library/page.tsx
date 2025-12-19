"use client";

import { useEffect, useState } from "react";
import { db } from "@/contexts/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import ProtectedRoute from "@/components/ProtectedRoute";
import BookCard from "@/components/BookCard";
import SearchBar from "@/components/SearchBar";
import { BookOpenIcon } from "@heroicons/react/24/outline";

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
      const allBooks: Book[] = snapshot.docs.map((doc) => {
        const d = doc.data();
        return {
          id: doc.id,
          title: d.title ?? "Untitled",
          author: d.author ?? "Unknown",
          description: d.description ?? "",
        };
      });

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
      <div className="px-6 py-8 bg-[#0a0a0f] min-h-screen">
        <h2 className="text-2xl font-semibold flex items-center gap-2 mb-6 text-white">
          <BookOpenIcon className="h-6 w-6 flex-shrink-0 text-indigo-400" />
          Your Library
        </h2>

        <SearchBar onSearch={fetchBooks} aria-label="Search library" />

        <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading &&
            Array.from({ length: 8 }).map((_, i) => (
              <BookCard key={i} loading />
            ))}

          {error && (
            <p className="text-red-500 text-center mt-4">{error}</p>
          )}

          {!loading && !error && books.length === 0 && (
            <p className="text-neutral-400 text-center mt-4">
              No results found.
            </p>
          )}

          {!loading &&
            !error &&
            books.map((book) => <BookCard key={book.id} book={book} />)}
        </section>
      </div>
    </ProtectedRoute>
  );
}