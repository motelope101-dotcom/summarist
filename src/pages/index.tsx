"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { db, auth } from "@/lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
};

export default function HomePage() {
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

  console.log("Firebase Auth instance:", auth);
  console.log("Firebase Firestore instance:", db);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6">
      {/* Hero Section */}
      <section className="text-center mt-12 mb-8">
        <h1 className="text-4xl font-bold text-purple-800">Summarist</h1>
        <p className="mt-2 text-gray-600">
          Firebase is configured and ready to use!
        </p>
      </section>

      {/* Search Bar */}
      <div className="w-full max-w-md mb-10">
        <input
          type="text"
          placeholder="Search books..."
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
      </div>

      {/* Featured Books Grid */}
      {loading ? (
        <p className="text-neutral-500">Loading books...</p>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
            >
              <div className="h-40 bg-gray-200 rounded mb-3 flex items-center justify-center">
                <span className="text-gray-500">Cover</span>
              </div>
              <h2 className="text-lg font-semibold text-purple-700">
                {book.title}
              </h2>
              <p className="text-sm text-gray-500 mt-1">by {book.author}</p>
              <p className="text-sm text-gray-400 mt-1">{book.description}</p>
              <Link
                href={`/book/${book.id}`}
                className="mt-3 inline-block text-purple-600 hover:underline text-sm"
              >
                Read More →
              </Link>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}