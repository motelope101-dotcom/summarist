import { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "@/contexts/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import ProtectedRoute from "@/components/ProtectedRoute";

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

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "books"));
        const booksData: Book[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Book, "id">),
        }));
        setBooks(booksData);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to load your library. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <ProtectedRoute>
      <section className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading && (
          <p className="text-neutral-500">Loading your library...</p>
        )}

        {error && (
          <p className="text-red-500">{error}</p>
        )}

        {!loading && !error && books.length === 0 && (
          <p className="text-neutral-400">Your library is empty.</p>
        )}

        {!loading && !error && books.map((book) => (
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
        ))}
      </section>
    </ProtectedRoute>
  );
}